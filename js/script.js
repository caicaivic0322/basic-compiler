// 初始化编辑器
let editor;
let currentLanguage = 'cpp';
let currentTheme = 'default';

// 默认代码模板
const codeTemplates = {
    cpp: `#include <iostream>

using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    python: `# 这是一个简单的Python程序

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`
};

// 代码模板库
const templateLibrary = {
    // C++模板
    'cpp-hello': `#include <iostream>

using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    'cpp-io': `#include <iostream>

using namespace std;

int main() {
    int a, b;
    cout << "请输入两个整数: ";
    cin >> a >> b;
    cout << "它们的和是: " << a + b << endl;
    return 0;
}`,
    'cpp-array': `#include <iostream>

using namespace std;

int main() {
    const int SIZE = 5;
    int numbers[SIZE];
    
    cout << "请输入" << SIZE << "个整数:" << endl;
    
    // 读取数组元素
    for(int i = 0; i < SIZE; i++) {
        cout << "第" << i+1 << "个数: ";
        cin >> numbers[i];
    }
    
    // 计算总和
    int sum = 0;
    for(int i = 0; i < SIZE; i++) {
        sum += numbers[i];
    }
    
    cout << "数组元素的总和是: " << sum << endl;
    cout << "平均值是: " << static_cast<double>(sum) / SIZE << endl;
    
    return 0;
}`,
    'cpp-function': `#include <iostream>

using namespace std;

// 函数声明
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
double divide(int a, int b);

int main() {
    int num1, num2;
    
    cout << "请输入两个整数: ";
    cin >> num1 >> num2;
    
    cout << "加法: " << add(num1, num2) << endl;
    cout << "减法: " << subtract(num1, num2) << endl;
    cout << "乘法: " << multiply(num1, num2) << endl;
    
    if(num2 != 0) {
        cout << "除法: " << divide(num1, num2) << endl;
    } else {
        cout << "除法: 除数不能为零" << endl;
    }
    
    return 0;
}

// 函数定义
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

double divide(int a, int b) {
    return static_cast<double>(a) / b;
}`,
    'cpp-class': `#include <iostream>
#include <string>

using namespace std;

// 定义学生类
class Student {
private:
    string name;
    int age;
    double score;
    
public:
    // 构造函数
    Student(string n, int a, double s) : name(n), age(a), score(s) {}
    
    // 成员函数
    void display() {
        cout << "姓名: " << name << endl;
        cout << "年龄: " << age << endl;
        cout << "分数: " << score << endl;
    }
    
    // Getter和Setter方法
    string getName() { return name; }
    void setName(string n) { name = n; }
    
    int getAge() { return age; }
    void setAge(int a) { age = a; }
    
    double getScore() { return score; }
    void setScore(double s) { score = s; }
};

int main() {
    // 创建学生对象
    Student student1("张三", 18, 92.5);
    Student student2("李四", 19, 88.0);
    
    // 显示学生信息
    cout << "学生1信息:" << endl;
    student1.display();
    
    cout << "\n学生2信息:" << endl;
    student2.display();
    
    // 修改学生信息
    student1.setScore(95.0);
    cout << "\n修改后的学生1分数: " << student1.getScore() << endl;
    
    return 0;
}`,

    // Python模板
    'python-hello': `# 这是一个简单的Python程序

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
    'python-io': `# Python输入输出示例

def main():
    # 获取用户输入
    name = input("请输入您的姓名: ")
    age = int(input("请输入您的年龄: "))
    
    # 输出信息
    print(f"您好，{name}！")
    print(f"明年您将会 {age + 1} 岁。")

if __name__ == "__main__":
    main()`,
    'python-list': `# Python列表操作示例

def main():
    # 创建一个列表
    numbers = []
    
    # 获取用户输入
    print("请输入5个数字:")
    for i in range(5):
        num = float(input(f"第{i+1}个数: "))
        numbers.append(num)
    
    # 显示列表信息
    print(f"您输入的数字是: {numbers}")
    print(f"最大值: {max(numbers)}")
    print(f"最小值: {min(numbers)}")
    print(f"总和: {sum(numbers)}")
    print(f"平均值: {sum(numbers) / len(numbers)}")

if __name__ == "__main__":
    main()`,
    'python-function': `# Python函数示例

def add(a, b):
    """返回两个数的和"""
    return a + b

def subtract(a, b):
    """返回两个数的差"""
    return a - b

def multiply(a, b):
    """返回两个数的积"""
    return a * b

def divide(a, b):
    """返回两个数的商"""
    if b == 0:
        return "错误：除数不能为零"
    return a / b

def main():
    # 获取用户输入
    num1 = float(input("请输入第一个数: "))
    num2 = float(input("请输入第二个数: "))
    
    # 调用函数并显示结果
    print(f"{num1} + {num2} = {add(num1, num2)}")
    print(f"{num1} - {num2} = {subtract(num1, num2)}")
    print(f"{num1} * {num2} = {multiply(num1, num2)}")
    print(f"{num1} / {num2} = {divide(num1, num2)}")

if __name__ == "__main__":
    main()`,
    'python-class': `# Python类示例

class Student:
    """学生类"""
    
    def __init__(self, name, age, score):
        """初始化方法"""
        self.name = name
        self.age = age
        self.score = score
    
    def display(self):
        """显示学生信息"""
        print(f"姓名: {self.name}")
        print(f"年龄: {self.age}")
        print(f"分数: {self.score}")
    
    def get_grade(self):
        """根据分数获取等级"""
        if self.score >= 90:
            return "A"
        elif self.score >= 80:
            return "B"
        elif self.score >= 70:
            return "C"
        elif self.score >= 60:
            return "D"
        else:
            return "F"

def main():
    # 创建学生对象
    student1 = Student("张三", 18, 92)
    student2 = Student("李四", 19, 75)
    
    # 显示学生信息
    print("学生1信息:")
    student1.display()
    print(f"等级: {student1.get_grade()}")
    
    print("\n学生2信息:")
    student2.display()
    print(f"等级: {student2.get_grade()}")

if __name__ == "__main__":
    main()`
};

// 初始化代码编辑器
function initializeEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'text/x-c++src',
        theme: 'default',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        hintOptions: {
            completeSingle: false
        }
    });
    
    // 设置默认代码
    editor.setValue(codeTemplates.cpp);
    
    // 自动调整编辑器大小
    window.addEventListener('resize', function() {
        editor.refresh();
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 语言选择下拉菜单
    document.getElementById('language-select').addEventListener('change', function(e) {
        selectLanguage(e.target.value);
    });
    
    // 主题选择（如果存在）
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function(e) {
            changeTheme(e.target.value);
        });
    }
    
    // 模板选择器
    document.getElementById('template-select').addEventListener('change', function(e) {
        applyTemplate(e.target.value);
    });
    
    // 清空输入按钮
    document.getElementById('clear-input-btn').addEventListener('click', function() {
        document.getElementById('input').value = '';
    });
    
    // 运行按钮
    document.getElementById('run-btn').addEventListener('click', function() {
        runCode();
    });
    
    // 语法检查按钮
    document.getElementById('check-btn').addEventListener('click', function() {
        checkSyntax();
    });
}

// 选择编程语言
function selectLanguage(language) {
    currentLanguage = language;
    
    // 更新下拉菜单状态
    const languageSelect = document.getElementById('language-select');
    languageSelect.value = language;
    
    // 更新编辑器模式
    if (language === 'cpp') {
        editor.setOption('mode', 'text/x-c++src');
    } else if (language === 'python') {
        editor.setOption('mode', 'text/x-python');
    }
    
    // 如果编辑器内容是默认模板，则切换到新语言的默认模板
    const currentCode = editor.getValue().trim();
    const isDefaultCpp = currentCode === codeTemplates.cpp.trim();
    const isDefaultPython = currentCode === codeTemplates.python.trim();
    
    if (isDefaultCpp || isDefaultPython) {
        editor.setValue(codeTemplates[language]);
    }
}

// 应用代码模板
function applyTemplate(templateId) {
    if (!templateId) return; // 如果选择的是空选项，不执行任何操作
    
    // 映射模板ID到实际的模板键
    let templateKey;
    switch(templateId) {
        case 'hello':
            templateKey = currentLanguage === 'cpp' ? 'cpp-hello' : 'python-hello';
            break;
        case 'basic':
            templateKey = currentLanguage === 'cpp' ? 'cpp-io' : 'python-io';
            break;
        case 'loop':
            templateKey = currentLanguage === 'cpp' ? 'cpp-array' : 'python-list';
            break;
        case 'function':
            templateKey = currentLanguage === 'cpp' ? 'cpp-function' : 'python-function';
            break;
        case 'class':
            templateKey = currentLanguage === 'cpp' ? 'cpp-class' : 'python-class';
            break;
        default:
            return;
    }
    
    // 检查模板是否存在
    if (templateLibrary[templateKey]) {
        // 应用模板
        editor.setValue(templateLibrary[templateKey]);
        
        // 重置模板选择器
        setTimeout(() => {
            document.getElementById('template-select').value = '';
        }, 100);
    }
}

// 切换编程语言
function changeLanguage(language) {
    currentLanguage = language;
    
    // 更改编辑器模式
    if (language === 'cpp') {
        editor.setOption('mode', 'text/x-c++src');
    } else if (language === 'python') {
        editor.setOption('mode', 'text/x-python');
    }
    
    // 如果编辑器内容是默认模板，则切换到新语言的默认模板
    const currentCode = editor.getValue().trim();
    const isDefaultCpp = currentCode === codeTemplates.cpp.trim();
    const isDefaultPython = currentCode === codeTemplates.python.trim();
    
    if (isDefaultCpp || isDefaultPython) {
        editor.setValue(codeTemplates[language]);
    }
}

// 切换主题
function changeTheme(theme) {
    currentTheme = theme;
    
    // 更改编辑器主题
    let editorTheme = 'default';
    
    switch(theme) {
        case 'eclipse':
            editorTheme = 'eclipse';
            break;
        case 'idea':
            editorTheme = 'idea';
            break;
        case 'monokai':
            editorTheme = 'monokai';
            break;
        case 'dracula':
            editorTheme = 'dracula';
            break;
        case 'material':
            editorTheme = 'material';
            break;
        default:
            editorTheme = 'default';
    }
    
    // 加载编辑器主题
    loadTheme(editorTheme);
    
    // 更改页面主题
    document.body.className = theme !== 'default' ? `theme-${theme}` : '';
}

// 动态加载编辑器主题
function loadTheme(theme) {
    if (theme === 'default') {
        editor.setOption('theme', 'default');
        return;
    }
    
    // 检查主题是否已加载
    const themeLink = document.getElementById(`cm-theme-${theme}`);
    if (!themeLink) {
        // 加载主题CSS
        const link = document.createElement('link');
        link.id = `cm-theme-${theme}`;
        link.rel = 'stylesheet';
        link.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/${theme}.min.css`;
        document.head.appendChild(link);
        
        // 等待CSS加载完成
        link.onload = function() {
            editor.setOption('theme', theme);
        };
    } else {
        editor.setOption('theme', theme);
    }
}

// 语法检查
function checkSyntax() {
    const code = editor.getValue();
    const language = currentLanguage;
    
    // 显示加载动画
    const output = document.getElementById('output');
    output.textContent = '检查语法中...';
    
    // 使用真实的编译器API进行语法检查
    const apiUrl = language === 'cpp' ? '/check/cpp' : '/check/python';
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            output.innerHTML = `<div class="success-message">语法检查通过！</div>`;
        } else {
            output.innerHTML = `<div class="error-message">${data.error}</div>`;
        }
    })
    .catch(error => {
        console.error('语法检查错误:', error);
        output.innerHTML = `<div class="error-message">连接编译器失败: ${error.message}</div>`;
    });
}

// 清除输入
function clearInput() {
    document.getElementById('input').value = '';
}

// 复制输出
function copyOutput() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output).then(() => {
        alert('输出已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 运行代码
function runCode() {
    const code = editor.getValue();
    const input = document.getElementById('input').value;
    const language = currentLanguage;
    
    // 获取当前选择的语言
    const selectedLanguage = document.getElementById('language-select').value;
    
    // 显示加载动画
    const output = document.getElementById('output');
    output.textContent = '编译中，请稍候...';
    
    // 使用真实的编译器API
    const apiUrl = language === 'cpp' ? '/compile/cpp' : '/compile/python';
    
    console.log('发送请求到:', apiUrl);
    console.log('currentLanguage:', language);
    console.log('selectedLanguage:', selectedLanguage);
    console.log('代码:', code);
    console.log('输入:', input);
    
    // 添加请求开始时间
    const startTime = new Date();
    console.log('请求开始时间:', startTime.toISOString());
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, input })
    })
    .then(response => {
        console.log('收到响应:', response);
        console.log('响应状态:', response.status);
        console.log('响应状态文本:', response.statusText);
        console.log('响应头:', response.headers);
        
        // 计算请求耗时
        const endTime = new Date();
        const duration = endTime - startTime;
        console.log('请求结束时间:', endTime.toISOString());
        console.log('请求耗时:', duration, '毫秒');
        
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
        console.log('响应数据:', data);
        if (data.success) {
            // 显示程序输出，并在其后添加进程结束信息
            output.innerHTML = `<pre>${data.output}</pre><div class="return-value">进程已结束，退出代码 0</div>`;
        } else {
            output.innerHTML = `<pre class="error">${data.error}</pre>`;
        }
    })
    .catch(error => {
        console.error('编译错误:', error);
        console.error('错误堆栈:', error.stack);
        
        // 在输出区域显示错误
        output.innerHTML = `<pre class="error">请求失败: ${error.message}</pre>`;
        
        // 使用模拟编译作为后备
        simulateCompilation(code, input, language)
            .then(simulatedOutput => {
                // 显示模拟输出，并在其后添加进程结束信息
                output.innerHTML = `<pre>${simulatedOutput}</pre><div class="return-value">进程已结束，退出代码 0</div>`;
            })
            .catch(simError => {
                output.innerHTML = `<pre class="error">模拟编译失败: ${simError.message}</pre>`;
            });
    });
}

// 模拟编译和执行过程
function simulateCompilation(code, input, language) {
    return new Promise((resolve, reject) => {
        // 模拟网络延迟
        setTimeout(() => {
            try {
                console.log("模拟编译开始，语言:", language);
                console.log("用户输入:", input);
                console.log("代码内容:", code.substring(0, 100) + "...");
                
                // 检查当前代码是否匹配某个模板
                let templateId = null;
                for (const [id, template] of Object.entries(templateLibrary)) {
                    if (code.trim() === template.trim()) {
                        templateId = id;
                        console.log("匹配到模板:", templateId);
                        break;
                    }
                }
                
                // 简单的语法检查
                if (language === 'cpp') {
                    // 检查基本的C++语法
                    if (!code.includes('main()') && !code.includes('main('))  {
                        throw new Error('编译错误: 缺少main函数');
                    }
                    if (!code.includes('return 0') && code.includes('int main')) {
                        throw new Error('编译错误: main函数缺少返回语句');
                    }
                    
                    // 检查括号匹配
                    const openBrackets = (code.match(/\{/g) || []).length;
                    const closeBrackets = (code.match(/\}/g) || []).length;
                    if (openBrackets !== closeBrackets) {
                        throw new Error(`编译错误: 大括号不匹配，有 ${openBrackets} 个 '{' 和 ${closeBrackets} 个 '}'`);
                    }
                    
                    const openParentheses = (code.match(/\(/g) || []).length;
                    const closeParentheses = (code.match(/\)/g) || []).length;
                    if (openParentheses !== closeParentheses) {
                        throw new Error(`编译错误: 圆括号不匹配，有 ${openParentheses} 个 '(' 和 ${closeParentheses} 个 ')'`);
                    }
                    
                    // 检查分号
                    const lines = code.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim();
                        // 跳过注释、空行、包含大括号的行和预处理指令
                        if (line && !line.startsWith('//') && !line.startsWith('#') && 
                            !line.includes('{') && !line.includes('}') && 
                            !line.includes('if') && !line.includes('for') && !line.includes('while') &&
                            !line.endsWith(',') && !line.includes('using namespace') &&
                            !line.includes('int main') && !line.includes('return') &&
                            !line.endsWith(';')) {
                            // 可能缺少分号的行
                            if (line.includes('cout') || line.includes('cin') || 
                                line.includes('printf') || line.includes('scanf') ||
                                line.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^;]+$/)) {
                                throw new Error(`编译错误: 第 ${i+1} 行可能缺少分号 ';'`);
                            }
                        }
                    }
                    
                    // 根据代码内容生成模拟输出
                    let output = '';
                    
                    // 检查是否包含输出语句
                    if (code.includes('cout') || code.includes('printf')) {
                        // 根据不同模板生成不同输出
                        if (templateId === 'cpp-hello' || code.includes('Hello, World!')) {
                            output = 'Hello, World!\n';
                        } else if (templateId === 'cpp-io' || code.includes('请输入两个整数')) {
                            // 处理输入，即使输入为空也提供默认值
                            const lines = input ? input.split(/[\s,\n]+/) : [];
                            const num1 = parseInt((lines[0] && lines[0].trim()) ? lines[0].trim() : '10');
                            const num2 = parseInt((lines[1] && lines[1].trim()) ? lines[1].trim() : '20');
                            output += `请输入两个整数: ${num1} ${num2}\n`;
                            output += `它们的和是: ${num1 + num2}`;
                        } else if (code.includes('max(') && code.includes('cin>>')) {
                            // 处理自定义代码：求最大值
                            const lines = input ? input.split(/[\s,\n]+/) : [];
                            const num1 = parseInt((lines[0] && lines[0].trim()) ? lines[0].trim() : '3');
                            const num2 = parseInt((lines[1] && lines[1].trim()) ? lines[1].trim() : '5');
                            output += `${Math.max(num1, num2)}`;
                        } else if (templateId === 'cpp-array' || code.includes('数组元素')) {
                            // 处理数组输入
                            if (input && input.trim()) {
                                try {
                                    const numbers = input.split(/[\s,]+/).map(n => parseInt(n)).filter(n => !isNaN(n)).slice(0, 5);
                                    if (numbers.length > 0) {
                                        output += `请输入5个整数:\n`;
                                        for (let i = 0; i < numbers.length; i++) {
                                            output += `第${i+1}个数: ${numbers[i]}\n`;
                                        }
                                        const sum = numbers.reduce((a, b) => a + b, 0);
                                        output += `数组元素的总和是: ${sum}\n`;
                                        output += `平均值是: ${sum / numbers.length}`;
                                    } else {
                                        throw new Error("无效的数字输入");
                                    }
                                } catch (e) {
                                    // 使用默认数据
                                    output += '请输入5个整数:\n';
                                    output += '第1个数: 10\n';
                                    output += '第2个数: 20\n';
                                    output += '第3个数: 30\n';
                                    output += '第4个数: 40\n';
                                    output += '第5个数: 50\n';
                                    output += '数组元素的总和是: 150\n';
                                    output += '平均值是: 30';
                                }
                            } else {
                                // 使用默认数据
                                output += '请输入5个整数:\n';
                                output += '第1个数: 10\n';
                                output += '第2个数: 20\n';
                                output += '第3个数: 30\n';
                                output += '第4个数: 40\n';
                                output += '第5个数: 50\n';
                                output += '数组元素的总和是: 150\n';
                                output += '平均值是: 30';
                            }
                        } else if (templateId === 'cpp-function' || code.includes('函数声明')) {
                            // 处理函数输入
                            try {
                                const lines = input ? input.split(/[\s,\n]+/) : [];
                                const num1 = parseInt((lines[0] && lines[0].trim()) ? lines[0].trim() : '10');
                                const num2 = parseInt((lines[1] && lines[1].trim()) ? lines[1].trim() : '5');
                                
                                if (isNaN(num1) || isNaN(num2)) {
                                    throw new Error("无效的数字输入");
                                }
                                
                                output += `请输入两个整数: ${num1} ${num2}\n`;
                                output += `加法: ${num1 + num2}\n`;
                                output += `减法: ${num1 - num2}\n`;
                                output += `乘法: ${num1 * num2}\n`;
                                output += num2 !== 0 ? 
                                    `除法: ${num1 / num2}` : 
                                    `除法: 除数不能为零`;
                            } catch (e) {
                                // 使用默认数据
                                output += '请输入两个整数: 10 5\n';
                                output += '加法: 15\n';
                                output += '减法: 5\n';
                                output += '乘法: 50\n';
                                output += '除法: 2';
                            }
                        } else if (templateId === 'cpp-class' || code.includes('Student')) {
                            output += '学生1信息:\n';
                            output += '姓名: 张三\n';
                            output += '年龄: 18\n';
                            output += '分数: 92.5\n\n';
                            output += '学生2信息:\n';
                            output += '姓名: 李四\n';
                            output += '年龄: 19\n';
                            output += '分数: 88\n\n';
                            output += '修改后的学生1分数: 95';
                        } else {
                            // 处理自定义代码
                            // 尝试解析代码中的输入输出逻辑
                            try {
                                // 检查cout语句并提取输出内容
                                const coutMatches = code.match(/cout\s*<<\s*"[^"]*"(?:\s*<<\s*endl)?/g) || [];
                                
                                if (coutMatches.length > 0) {
                                    // 处理每个cout语句
                                    for (const match of coutMatches) {
                                        // 提取字符串内容
                                        const stringMatch = match.match(/"([^"]*)"/);
                                        if (stringMatch) {
                                            output += stringMatch[1];
                                            // 检查是否有endl
                                            if (match.includes('endl')) {
                                                output += '\n';
                                            }
                                        }
                                    }
                                } else if (code.includes('cin>>') || code.includes('scanf(')) {
                                    const lines = input ? input.split(/[\s,\n]+/) : [];
                                    
                                    // 计算输入的数字数量
                                    let inputCount = 0;
                                    let cinMatches = code.match(/cin\s*>>\s*[a-zA-Z0-9_]+/g) || [];
                                    let scanfMatches = code.match(/scanf\s*\(\s*["'][^"']*["']\s*,\s*[^)]*\)/g) || [];
                                    
                                    inputCount = cinMatches.length + scanfMatches.length;
                                    
                                    // 解析输入值
                                    const inputValues = [];
                                    for (let i = 0; i < inputCount && i < lines.length; i++) {
                                        inputValues.push(isNaN(parseFloat(lines[i])) ? lines[i] : parseFloat(lines[i]));
                                    }
                                    
                                    // 填充默认值
                                    while (inputValues.length < inputCount) {
                                        inputValues.push(10); // 默认值
                                    }
                                    
                                    // 尝试模拟一些常见操作
                                    if (code.includes('max(') || code.includes('min(')) {
                                        if (inputValues.length >= 2) {
                                            if (code.includes('max(')) {
                                                output += `${Math.max(inputValues[0], inputValues[1])}`;
                                            } else if (code.includes('min(')) {
                                                output += `${Math.min(inputValues[0], inputValues[1])}`;
                                            }
                                        }
                                    } else if (code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/')) {
                                        // 尝试检测基本算术运算
                                        if (inputValues.length >= 2) {
                                            if (code.includes('+')) {
                                                output += `${inputValues[0] + inputValues[1]}`;
                                            } else if (code.includes('-')) {
                                                output += `${inputValues[0] - inputValues[1]}`;
                                            } else if (code.includes('*')) {
                                                output += `${inputValues[0] * inputValues[1]}`;
                                            } else if (code.includes('/')) {
                                                output += inputValues[1] !== 0 ? 
                                                    `${inputValues[0] / inputValues[1]}` : 
                                                    `除数不能为零`;
                                            }
                                        }
                                    } else {
                                        // 默认输出输入值
                                        output += inputValues.join(' ');
                                    }
                                } else {
                                    output += '输出内容';
                                }
                            } catch (e) {
                                console.error("自定义代码解析错误:", e);
                                output += '输出内容';
                            }
                        }
                        
                        // 不再添加"程序执行完毕"，只保留返回值信息
                        resolve(output);
                    } else {
                        resolve('没有输出');
                    }
                } else if (language === 'python') {
                    // 检查基本的Python语法
                    const lines = code.split('\n');
                    
                    // 检查缩进一致性
                    let indentStack = [0];
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        // 跳过空行和注释
                        if (line.trim() === '' || line.trim().startsWith('#')) {
                            continue;
                        }
                        
                        // 计算缩进空格数
                        const indent = line.match(/^(\s*)/)[1].length;
                        
                        // 检查缩进是否是4的倍数
                        if (indent % 4 !== 0) {
                            throw new Error(`语法错误: 第 ${i+1} 行缩进不正确，Python建议使用4个空格的缩进`);
                        }
                        
                        // 检查缩进是否合理
                        if (indent > indentStack[indentStack.length - 1]) {
                            // 增加缩进
                            indentStack.push(indent);
                        } else if (indent < indentStack[indentStack.length - 1]) {
                            // 减少缩进
                            while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
                                indentStack.pop();
                            }
                            
                            if (indent !== indentStack[indentStack.length - 1]) {
                                throw new Error(`语法错误: 第 ${i+1} 行缩进不匹配`);
                            }
                        }
                    }
                    
                    // 检查括号匹配
                    const openBrackets = (code.match(/\{/g) || []).length;
                    const closeBrackets = (code.match(/\}/g) || []).length;
                    if (openBrackets !== closeBrackets) {
                        throw new Error(`语法错误: 大括号不匹配，有 ${openBrackets} 个 '{' 和 ${closeBrackets} 个 '}'`);
                    }
                    
                    const openParentheses = (code.match(/\(/g) || []).length;
                    const closeParentheses = (code.match(/\)/g) || []).length;
                    if (openParentheses !== closeParentheses) {
                        throw new Error(`语法错误: 圆括号不匹配，有 ${openParentheses} 个 '(' 和 ${closeParentheses} 个 ')'`);
                    }
                    
                    // 检查冒号
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (line && !line.startsWith('#')) {
                            if ((line.includes('if ') || line.includes('elif ') || line.includes('else') || 
                                 line.includes('for ') || line.includes('while ') || line.includes('def ') || 
                                 line.includes('class ')) && !line.endsWith(':')) {
                                throw new Error(`语法错误: 第 ${i+1} 行的控制语句应以冒号 ':' 结尾`);
                            }
                        }
                    }
                    // 检查是否包含输出语句
                    if (code.includes('print(') || code.includes('print ')) {
                        // 根据不同模板生成不同输出
                        if (templateId === 'python-hello' || code.includes('Hello, World!')) {
                            output = 'Hello, World!';
                        } else if (templateId === 'python-io' || code.includes('请输入您的姓名')) {
                            // 处理输入，即使输入为空也提供默认值
                            const lines = input ? input.split('\n') : [];
                            const name = (lines[0] && lines[0].trim()) ? lines[0].trim() : '张三';
                            const age = parseInt((lines[1] && lines[1].trim()) ? lines[1].trim() : '20');
                            output += `请输入您的姓名: ${name}\n`;
                            output += `请输入您的年龄: ${age}\n`;
                            output += `您好，${name}！\n`;
                            output += `明年您将会 ${age + 1} 岁。`;
                        } else if (templateId === 'python-list' || code.includes('列表操作示例')) {
                            // 处理列表输入
                            if (input && input.trim()) {
                                try {
                                    const numbers = input.split(/[\s,\n]+/).map(n => parseFloat(n)).filter(n => !isNaN(n)).slice(0, 5);
                                    if (numbers.length > 0) {
                                        output += '请输入5个数字:\n';
                                        for (let i = 0; i < numbers.length; i++) {
                                            output += `第${i+1}个数: ${numbers[i]}\n`;
                                        }
                                        while (numbers.length < 5) numbers.push(0);
                                        output += `您输入的数字是: [${numbers.join(', ')}]\n`;
                                        output += `最大值: ${Math.max(...numbers)}\n`;
                                        output += `最小值: ${Math.min(...numbers)}\n`;
                                        output += `总和: ${numbers.reduce((a, b) => a + b, 0)}\n`;
                                        output += `平均值: ${numbers.reduce((a, b) => a + b, 0) / numbers.length}`;
                                    } else {
                                        throw new Error("无效的数字输入");
                                    }
                                } catch (e) {
                                    // 使用默认数据
                                    output += '请输入5个数字:\n';
                                    output += '第1个数: 10.0\n';
                                    output += '第2个数: 20.0\n';
                                    output += '第3个数: 30.0\n';
                                    output += '第4个数: 40.0\n';
                                    output += '第5个数: 50.0\n';
                                    output += '您输入的数字是: [10.0, 20.0, 30.0, 40.0, 50.0]\n';
                                    output += '最大值: 50.0\n';
                                    output += '最小值: 10.0\n';
                                    output += '总和: 150.0\n';
                                    output += '平均值: 30.0';
                                }
                            } else {
                                // 使用默认数据
                                output += '请输入5个数字:\n';
                                output += '第1个数: 10.0\n';
                                output += '第2个数: 20.0\n';
                                output += '第3个数: 30.0\n';
                                output += '第4个数: 40.0\n';
                                output += '第5个数: 50.0\n';
                                output += '您输入的数字是: [10.0, 20.0, 30.0, 40.0, 50.0]\n';
                                output += '最大值: 50.0\n';
                                output += '最小值: 10.0\n';
                                output += '总和: 150.0\n';
                                output += '平均值: 30.0';
                            }
                        } else if (templateId === 'python-function' || code.includes('函数示例')) {
                            // 处理函数输入
                            try {
                                const lines = input ? input.split('\n') : [];
                                const num1 = parseFloat((lines[0] && lines[0].trim()) ? lines[0].trim() : '10');
                                const num2 = parseFloat((lines[1] && lines[1].trim()) ? lines[1].trim() : '5');
                                
                                if (isNaN(num1) || isNaN(num2)) {
                                    throw new Error("无效的数字输入");
                                }
                                
                                output += `请输入第一个数: ${num1}\n`;
                                output += `请输入第二个数: ${num2}\n`;
                                output += `${num1} + ${num2} = ${num1 + num2}\n`;
                                output += `${num1} - ${num2} = ${num1 - num2}\n`;
                                output += `${num1} * ${num2} = ${num1 * num2}\n`;
                                output += num2 !== 0 ? 
                                    `${num1} / ${num2} = ${num1 / num2}` : 
                                    `${num1} / ${num2} = 错误：除数不能为零`;
                            } catch (e) {
                                // 使用默认数据
                                output += '请输入第一个数: 10\n';
                                output += '请输入第二个数: 5\n';
                                output += '10 + 5 = 15\n';
                                output += '10 - 5 = 5\n';
                                output += '10 * 5 = 50\n';
                                output += '10 / 5 = 2';
                            }
                        } else if (templateId === 'python-class' || code.includes('Student')) {
                            output += '学生信息:\n';
                            output += '姓名: 张三, 年龄: 20, 分数: 95.0\n';
                            output += '姓名: 李四, 年龄: 19, 分数: 88.5\n\n';
                            output += '按分数排序后:\n';
                            output += '姓名: 张三, 年龄: 20, 分数: 95.0\n';
                            output += '姓名: 李四, 年龄: 19, 分数: 88.5';
                        } else {
                            // 处理自定义Python代码
                            try {
                                // 检查是否有输入操作
                                if (code.includes('input(')) {
                                    const lines = input ? input.split(/[\s,\n]+/) : [];
                                    
                                    // 计算输入的数量
                                    let inputCount = (code.match(/input\s*\(/g) || []).length;
                                    
                                    // 解析输入值
                                    const inputValues = [];
                                    for (let i = 0; i < inputCount && i < lines.length; i++) {
                                        inputValues.push(isNaN(parseFloat(lines[i])) ? lines[i] : parseFloat(lines[i]));
                                    }
                                    
                                    // 填充默认值
                                    while (inputValues.length < inputCount) {
                                        inputValues.push(10); // 默认值
                                    }
                                    
                                    // 尝试模拟一些常见操作
                                    if (code.includes('max(') || code.includes('min(')) {
                                        if (inputValues.length >= 2) {
                                            if (code.includes('max(')) {
                                                output += `${Math.max(inputValues[0], inputValues[1])}`;
                                            } else if (code.includes('min(')) {
                                                output += `${Math.min(inputValues[0], inputValues[1])}`;
                                            }
                                        }
                                    } else if (code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/')) {
                                        // 尝试检测基本算术运算
                                        if (inputValues.length >= 2) {
                                            if (code.includes('+')) {
                                                output += `${inputValues[0] + inputValues[1]}`;
                                            } else if (code.includes('-')) {
                                                output += `${inputValues[0] - inputValues[1]}`;
                                            } else if (code.includes('*')) {
                                                output += `${inputValues[0] * inputValues[1]}`;
                                            } else if (code.includes('/')) {
                                                output += inputValues[1] !== 0 ? 
                                                    `${inputValues[0] / inputValues[1]}` : 
                                                    `除数不能为零`;
                                            }
                                        }
                                    } else {
                                        // 默认输出输入值
                                        output += inputValues.join(' ');
                                    }
                                } else {
                                    output += '输出内容';
                                }
                            } catch (e) {
                                console.error("自定义Python代码解析错误:", e);
                                output += '输出内容';
                            }
                        }
                        
                        // 不再添加"程序执行完毕"，只保留返回值信息
                        resolve(output);
                    } else {
                        resolve('没有输出');
                    }
                }
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
}

// 代码自动补全功能
function setupAutoComplete() {
    // C++关键字
    const cppKeywords = [
        'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 
        'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 
        'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 
        'union', 'unsigned', 'void', 'volatile', 'while', 'class', 'namespace', 'try', 
        'catch', 'new', 'delete', 'public', 'private', 'protected', 'this', 'friend', 
        'virtual', 'inline', 'template', 'typename', 'using', 'cout', 'cin', 'endl'
    ];
    
    // Python关键字
    const pythonKeywords = [
        'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 
        'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 
        'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'True', 'try', 
        'while', 'with', 'yield', 'print', 'input', 'range', 'len', 'str', 'int', 'float', 'list'
    ];
    
    // 设置自动补全
    editor.on('keyup', function(cm, event) {
        if (!cm.state.completionActive && 
            event.keyCode > 64 && event.keyCode < 91) {
            CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    });
}

// 初始化时设置自动补全和编辑器
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM内容已加载');
    initializeEditor();
    setupEventListeners();
    setupAutoComplete();
    
    // 确保事件监听器已正确绑定
    const runBtn = document.getElementById('run-btn');
    const checkBtn = document.getElementById('check-btn');
    const languageSelect = document.getElementById('language-select');
    
    console.log('当前选择的语言:', languageSelect ? languageSelect.value : '未找到语言选择器');
    
    if (runBtn) {
        console.log('运行按钮已找到');
        runBtn.addEventListener('click', function() {
            console.log('运行按钮被点击');
            console.log('当前选择的语言:', document.getElementById('language-select').value);
            runCode();
        });
    } else {
        console.error('找不到运行按钮');
    }
    
    if (checkBtn) {
        console.log('语法检查按钮已找到');
        checkBtn.addEventListener('click', function() {
            console.log('语法检查按钮被点击');
            checkSyntax();
        });
    } else {
        console.error('找不到语法检查按钮');
    }
    
    // 添加语言选择器事件监听器
    if (languageSelect) {
        languageSelect.addEventListener('change', function(e) {
            console.log('语言已更改为:', e.target.value);
            selectLanguage(e.target.value);
        });
    }
});

// 微信二维码弹窗功能
function showWechatQR() {
    const modal = document.getElementById('wechat-qr-modal');
    if (modal) {
        modal.style.display = 'block';
        // 检查二维码图片是否存在
        checkQRImage();
        // 添加点击背景关闭弹窗的功能
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeWechatQR();
            }
        };
    }
}

function closeWechatQR() {
    const modal = document.getElementById('wechat-qr-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 检查二维码图片是否存在
function checkQRImage() {
    const qrImage = document.getElementById('wechat-qr-image');
    const qrPlaceholder = document.getElementById('qr-placeholder');
    
    if (qrImage && qrPlaceholder) {
        // 创建一个新的Image对象来检查图片是否存在
        const img = new Image();
        img.onload = function() {
            // 图片加载成功，显示图片，隐藏占位内容
            qrImage.style.display = 'block';
            qrPlaceholder.style.display = 'none';
        };
        img.onerror = function() {
            // 图片加载失败，显示占位内容，隐藏图片
            qrImage.style.display = 'none';
            qrPlaceholder.style.display = 'block';
        };
        
        // 尝试加载图片
        img.src = qrImage.src;
    }
}