# HomeworkCLI
Homework Platform API in Typescript  
You are welcome to join us to improve this project.  
[Chinese README](./README_CN.md)
## Functions
1. HomeworkUpload - upload file as document and send it
2. GetExp - get exp daily
## How to use
### Build from soure
Before you start, you should install [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/)
```bash
npm install yarn typescript -g
git clone https://github.com/HomeworkCLI/HomeworkCLI.git
cd HomeworkCLI/
yarn install
tsc
node build/tools/HomeworkUpload.js
```
### Pre-built js
1. Download the latest [action build](https://github.com/HomeworkCLI/HomeworkCLI/actions)
2. ```bash
   npm install yarn -g
   unzip -d HomeworkCLI Build.zip
   cd HomeworkCLI/
   yarn install
   node build/tools/HomeworkUpload.js
   ```
### Pre-built binary
See [releases](https://github.com/HomeworkCLI/HomeworkCLI/releases/latest)
## Notice
Codes are written and tested on ArchLinux. There may be problems on Windows. Please indicate your system when reporting problems.
## TODO
1. HomeworkMessageServer - send chat message to control server
2. More APIs...
## LICENSE
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
