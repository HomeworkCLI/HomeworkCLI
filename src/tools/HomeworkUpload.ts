/*
 * @Date: 2020-07-19 10:13:00
 * @Author: goEval
 * @LastEditors: goEval
 * @LastEditTime: 2020-07-22 20:32:45
 * @FilePath: \HomeworkCLI\src\tools\HomeworkUpload.ts
 * @Github: https://github.com/heqyou_free
 */
import OSS from 'ali-oss';
import 'colors';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import * as uuid from 'uuid';
import HomeworkCLI from '../HomeworkCLI';

console.log(`HomeworkUpload [Version 1.0] (HomeworkCLI [Version ${HomeworkCLI.version}])`.blue);
console.log('Copyright (c) 2020 goEval. All right reserved.'.blue);
console.log('This software is licensed under MIT License.'.blue);
console.log('Warning: This is a pre-release version, may come with bugs.'.yellow.bgRed);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// eslint-disable-next-line require-jsdoc
function rlPromisify(fn: any): any {
  return async (...args: any) => {
    return new Promise<string>((resolve) => fn(...args, resolve));
  };
}
const question = rlPromisify(rl.question.bind(rl));

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'jEStbggRfXVkDQ4e',
  accessKeySecret: 'YSoDROCJdlOHTF1RrMOtJfguJfItTK',
  bucket: 'yixuexiao-2',
  timeout: '6000s',
});
const student = new HomeworkCLI.HomeworkCLI();
const teacher = new HomeworkCLI.HomeworkCLI();
(async () => {
  await student.clientLogin(
      await question('Username: '),
      await question('Password: '),
      true,
  );
  teacher.offlineLogin('inavamirb6netdi69uwp6g');
  let pathstr;
  while (true) {
    while (true) {
      pathstr = await question('Drag&Drop yout file and press enter to upload or press Ctrl-C to exit: '.green);
      if (fs.existsSync(pathstr)) {
        if (fs.statSync(pathstr).isDirectory()) {
          const array = fs.readdirSync(pathstr);
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (!fs.statSync(path.join(pathstr, element)).isDirectory()) {
              await upload(path.join(pathstr, element));
            }
          }
        } else {
          break;
        }
      } else {
        console.log('File not found'.red);
      }
    }
    await upload(pathstr);
  }
})();
/**
 * upload
 * @param {string} file path to file
 * @return {Promise<OSS.NormalSuccessResponse>}
 */
function upload(file: string): Promise<OSS.NormalSuccessResponse> {
  console.log('uploading ' + file);
  const md5 = uuid.v4();
  const ossfile = `aliba/upload/HomeworkUpload/${md5}/0.0${path.extname(file)}`;
  return client.put(ossfile, fs.createReadStream(file)).then(async (value) => {
    console.log(`saving document, document uuid: ${md5}`.gray);
    return teacher.saveDocNew({
      title: path.basename(file),
      doctype: path.extname(file).slice(1),
      docsize: fs.statSync(file).size,
      dir: 'aliba/upload/HomeworkUpload',
      key: ossfile,
      md5code: md5,
      guid: md5,
      isconverth5: false,
      ispublish: false,
      agent: 'android',
      iflyknowledge: '',
      bankname: '传媒',
      category1: '',
      category2: '',
      categoryid: 'ghnvak6jnkdoh0hg1pdowq',
      categoryname: '课件',
      isschool: false,
      creator: teacher.userid,
    });
  }).then((value) => {
    console.log(`sharing document, document id: ${value.data.docid}`.gray);
    return teacher.shareDoc('1', '', value.data.docid, student.userid);
  }).then((value) => {
    console.log(`putting ACL, response code: ${value.code}`);
    return client.putACL(ossfile, 'public-read');
  });
}
