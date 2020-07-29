/*
 * @Date: 2020-07-19 10:54:58
 * @Author: goEval
 * @LastEditors: goEval
 * @LastEditTime: 2020-07-22 17:20:08
 * @FilePath: \HomeworkCLI\src\tools\GetExp.ts
 * @Github: https://github.com/heqyou_free
 */
import HomeworkCLI from '../HomeworkCLI';
import readline from 'readline';
import fs from 'fs';

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

(async () => {
  const student = new HomeworkCLI.HomeworkCLI();
  if (fs.existsSync('./homeworkcli.json')) {
    const homeworkdata: HomeworkCLI.HomeworkData = JSON.parse(fs.readFileSync('./homeworkcli.json').toString());
    student.offlineLogin(homeworkdata.userid, homeworkdata.token);
  } else {
    await student.clientLogin(await question('Username: '), await question('Password: '), true);
    fs.writeFileSync('./homeworkcli.json', JSON.stringify(student.getData()));
  }
  while (true) {
    student.todaySign().then(() => {
      return student.getNoticeList(1);
    }).then(async () => {
      for (let i = 1; i < 5; i++) {
        const result = await student.coursewareList(i);
        for (let ii = 0; ii < result.data.length; ii++) {
          console.log('checking ' + result.data[ii].title);
          if ((await student.coursewareDynamicData(result.data[ii].dynamicid)).data.issee === 0) {
            console.log('marking ' + result.data[ii].title);
            return student.setCoursewareInfo(result.data[ii].dynamicid, 1);
          }
        }
      }
    }).then(async () => {
      for (let i = 1; i < 30; i++) {
        const result = await student.listStuLessonClass(i);
        for (let ii = 0; ii < result.data.length; ii++) {
          console.log('checking ' + result.data[ii].title);
          const lesson = await student.operateLessonInfo(result.data[ii].lessondynamicid, result.data[ii].lessonid);
          if (lesson.data.understandtype === 0) {
            console.log('marking ' + result.data[ii].title);
            await student.operateLesson(result.data[ii].lessondynamicid, result.data[ii].lessonid, 5);
            return student.addComment(result.data[ii].lessondynamicid, result.data[ii].lessonid, '一级棒');
          }
        }
      }
    }).catch((reason) => {
      console.error(reason);
    }).then((value) => {
      console.log('sleeping...');
    });
    await sleep(3600000);
  }
})();
// eslint-disable-next-line require-jsdoc
function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
