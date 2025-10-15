const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://0.0.0.0:8000'],
    credentials: true
}));
app.use(bodyParser.json());

// 请求日志中间件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// 创建临时目录
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// C++语法检查API
app.post('/check/cpp', (req, res) => {
    const { code } = req.body;
    
    // 创建唯一的文件名
    const timestamp = Date.now();
    const cppFile = path.join(tempDir, `check_${timestamp}.cpp`);
    
    // 写入代码文件
    fs.writeFileSync(cppFile, code);
    
    // 使用g++ -fsyntax-only进行语法检查
    exec(`g++ -fsyntax-only ${cppFile}`, (error, stdout, stderr) => {
        // 清理文件
        if (fs.existsSync(cppFile)) fs.unlinkSync(cppFile);
        
        if (error) {
            return res.json({ success: false, error: stderr });
        }
        
        res.json({ success: true });
    });
});

// Python语法检查API
app.post('/check/python', (req, res) => {
    const { code } = req.body;
    
    // 创建唯一的文件名
    const timestamp = Date.now();
    const pyFile = path.join(tempDir, `check_${timestamp}.py`);
    
    // 写入代码文件
    fs.writeFileSync(pyFile, code);
    
    // 使用python -m py_compile进行语法检查
    exec(`python3 -m py_compile ${pyFile}`, (error, stdout, stderr) => {
        // 清理文件
        if (fs.existsSync(pyFile)) fs.unlinkSync(pyFile);
        // 清理编译缓存文件
        const pycacheDir = path.join(path.dirname(pyFile), '__pycache__');
        if (fs.existsSync(pycacheDir)) {
            try {
                fs.rmdirSync(pycacheDir, { recursive: true });
            } catch (err) {
                console.error('清理__pycache__失败:', err);
            }
        }
        
        if (error) {
            return res.json({ success: false, error: stderr || error.message });
        }
        
        res.json({ success: true });
    });
});

// C++编译和执行API
app.post('/compile/cpp', (req, res) => {
    const { code, input } = req.body;
    
    // 创建唯一的文件名
    const timestamp = Date.now();
    const cppFile = path.join(tempDir, `code_${timestamp}.cpp`);
    const exeFile = path.join(tempDir, `code_${timestamp}.out`);
    const inputFile = path.join(tempDir, `input_${timestamp}.txt`);
    
    // 写入代码和输入文件
    fs.writeFileSync(cppFile, code);
    fs.writeFileSync(inputFile, input || '');
    
    // 编译C++代码
    exec(`g++ ${cppFile} -o ${exeFile}`, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            // 清理文件
            cleanupFiles(cppFile, exeFile, inputFile);
            return res.json({ success: false, error: compileStderr });
        }
        
        // 执行编译后的程序
        exec(`${exeFile} < ${inputFile}`, { timeout: 5000 }, (runError, runStdout, runStderr) => {
            // 清理文件
            cleanupFiles(cppFile, exeFile, inputFile);
            
            if (runError) {
                // 检查是否是超时错误
                if (runError.killed && runError.signal === 'SIGTERM') {
                    return res.json({ success: false, error: '程序执行超时（5秒限制）' });
                }
                return res.json({ success: false, error: runStderr || runError.message });
            }
            
            res.json({ success: true, output: runStdout });
        });
    });
});

// Python执行API
app.post('/compile/python', (req, res) => {
    console.log('收到Python编译请求');
    const { code, input } = req.body;
    console.log('Python代码:', code);
    console.log('Python输入:', input);
    
    // 创建唯一的文件名
    const timestamp = Date.now();
    const pyFile = path.join(tempDir, `code_${timestamp}.py`);
    const inputFile = path.join(tempDir, `input_${timestamp}.txt`);
    
    // 写入代码和输入文件
    fs.writeFileSync(pyFile, code);
    fs.writeFileSync(inputFile, input || '');
    
    // 执行Python代码
    exec(`python3 ${pyFile} < ${inputFile}`, { timeout: 5000 }, (error, stdout, stderr) => {
        console.log('Python执行完成');
        console.log('错误:', error);
        console.log('标准输出:', stdout);
        console.log('标准错误:', stderr);
        
        // 清理文件
        cleanupFiles(pyFile, null, inputFile);
        
        if (error) {
            // 检查是否是超时错误
            if (error.killed && error.signal === 'SIGTERM') {
                return res.json({ success: false, error: '程序执行超时（5秒限制）' });
            }
            return res.json({ success: false, error: stderr || error.message });
        }
        
        res.json({ success: true, output: stdout });
    });
});

// 清理临时文件
function cleanupFiles(codeFile, exeFile, inputFile) {
    if (fs.existsSync(codeFile)) fs.unlinkSync(codeFile);
    if (exeFile && fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
    if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`服务器运行在 http://0.0.0.0:${PORT}`);
});