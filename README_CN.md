# HomeworkCLI
Homework Platform API in Typescript  
欢迎您加入我们来改善这个项目。  
[English README](./README.md)
## 功能
1. HomeworkUpload - 上传文件并分享
2. GetExp - 每日经验最大化
## 使用方法
### 从源码编译
开始前，请安装[Node.js](https://nodejs.org/)和[Git](https://git-scm.com/)
```bash
npm install yarn typescript -g
git clone https://github.com/HomeworkCLI/HomeworkCLI.git
cd HomeworkCLI/
yarn install
tsc
node build/tools/HomeworkUpload.js
```
### 预编译js
1. 下载最新的[构建](https://github.com/HomeworkCLI/HomeworkCLI/actions)
2. ```bash
   npm install yarn -g
   unzip -d HomeworkCLI Build.zip
   cd HomeworkCLI/
   yarn install
   node build/tools/HomeworkUpload.js
   ```
### 预编译二进制文件
[最新发行包](https://github.com/HomeworkCLI/HomeworkCLI/releases/latest)
## 注意事项
代码是在ArchLinux上编写和测试的。在Windows上可能会有问题。在报告问题时请注明您的系统。
## TODO
1. HomeworkMessageServer - 通过私信控制服务器
2. 更多API...
## 许可证
MIT License

Copyright (c) 2020 HomeworkCLI

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
