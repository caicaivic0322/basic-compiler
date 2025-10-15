#include <iostream>
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
    
    cout << "
学生2信息:" << endl;
    student2.display();
    
    // 修改学生信息
    student1.setScore(95.0);
    cout << "
修改后的学生1分数: " << student1.getScore() << endl;
    
    return 0;
}