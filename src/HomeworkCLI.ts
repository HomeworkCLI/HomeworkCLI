/*
 * @Date: 2020-07-18 17:40:34
 * @Author: goEval
 * @LastEditors: goEval
 * @LastEditTime: 2020-07-24 10:57:31
 * @FilePath: \HomeworkCLI\src\HomeworkCLI.ts
 * @Github: https://github.com/heqyou_free
 */
import CryptoJS from 'crypto-js';
import axios from 'axios';
import qs from 'querystring';
import urls from './Urls';
const postinstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 8888,
  // },
});

postinstance.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, (error) => {
  throw error;
});
/**
 * HomeworkCLI
 */
namespace HomeworkCLI {
  /**
   * HomeworkCLI
   * @class
   */
  export class HomeworkCLI {
    private userid: string;
    private token: string;
    private schoolId: string;
    private cycoreId: string;
    private displayName: string;
    private baseUrl = 'http://www.yixuexiao.cn/';
    private mac = '03:03:03:03:03:03';
    private machine = 'HomeworkCLI';
    private osVersion = '11.0';

    /**
     * construtor
     */
    constructor() {
      this.userid = '';
      this.token = '';
      this.schoolId = '';
      this.cycoreId = '';
      this.displayName = '';
    }
    /**
     *******************
     * Login functions *
     *******************
     */
    // #region Loginfunctions
    /**
     * login
     * @param {string} username username
     * @param {string} password password
     * @param {boolean} isforce force login
     * @param {number} usertype user type
     * @return {Promise<HomeworkResponse>} response data
     */
    clientLogin(username: string, password: string, isforce: boolean, usertype: number = 1): Promise<HomeworkResponse> {
      return new Promise<HomeworkResponse>((resolve, reject) => {
        this.post(urls.clientLogin, this.encryptFormData({
          loginvalue: username,
          pwd: (() => {
            const keyHex = CryptoJS.enc.Utf8.parse('jevicjob');
            return CryptoJS.DES.encrypt(password, keyHex, {
              iv: keyHex,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }).toString();
          })(),
          device: 'mobile',
          isforce: isforce,
          usertype: usertype,
        })).then((result) => {
          this.userid = result.data.id;
          this.token = result.data.token;
          this.cycoreId = result.data.cycoreId;
          this.schoolId = result.data.schoolId;
          this.displayName = result.data.displayName;
          resolve(result);
        });
      });
    }
    /**
     * login with given userid and token
     * @param {string} userid userid
     * @param {string} token token
     * @return {HomeworkCLI}
     */
    offlineLogin(userid: string, token: string = ''): HomeworkCLI {
      this.userid = userid;
      this.token = token;
      return this;
    }
    // #endregion Loginfunctions

    /**
     ***************
     * Student API *
     ***************
     */
    // #region StudentAPI
    /**
     * coursewareList
     * @param {number} page page
     * @return {Promise<HomeworkResponse>}
     */
    coursewareList(page: number): Promise<HomeworkResponse> {
      return this.post(urls.coursewarelist, this.encryptFormData({
        page: page,
        userid: this.userid,
      }));
    }
    /**
     * mycoursewareList
     * @param {number} page page
     * @return {Promise<HomeworkResponse>}
     */
    mycoursewareList(page: number): Promise<HomeworkResponse> {
      return this.post(urls.mycoursewarelist, this.encryptFormData({
        page: page,
        userid: this.userid,
      }));
    }
    /**
     * getStudentDialogList
     * @return {Promise<HomeworkResponse>}
     */
    getStudentDialogList(): Promise<HomeworkResponse> {
      return this.post(urls.getStudentDialogList, this.encryptFormData({
        studentid: this.userid,
      }));
    }
    /**
     * sendChatMessage
     * @param {string} reuserid userid of receiver
     * @param {number} type type of content
     * @param {string} content content
     * @param {number} totaltime total time of voice record
     * @return {Promise<HomeworkResponse>}
     */
    sendChatMessage(reuserid: string, type: number, content: string, totaltime: number = 0): Promise<HomeworkResponse> {
      return this.post(urls.sendChatMessage, this.encryptFormData({
        totalTime: totaltime,
        type: type,
        userid: this.userid,
        content: content,
        reuserid: reuserid,
      }));
    }
    /**
     * getNoticeList
     * @param {number} page
     * @return {Promise<HomeworkResponse>}
     */
    getNoticeList(page: number): Promise<HomeworkResponse> {
      return this.post(urls.getNoticeList, this.encryptFormData({
        studentid: this.userid,
        page: page,
      }));
    }
    /**
     * getNewMessage
     * @return {Promise<HomeworkResponse>}
     */
    getNewMessage(): Promise<HomeworkResponse> {
      return this.post(urls.getNewMessage, this.encryptFormData({
        userid: this.userid,
      }));
    }
    /**
     * getUserRank
     * @return {Promise<HomeworkResponse>}
     */
    getUserRank(): Promise<HomeworkResponse> {
      return this.post(urls.getUserRank, this.encryptFormData({
        userid: this.userid,
      }));
    }
    /**
     * getReadandCommentCount
     * @param {string} noticeId notice id
     * @return {Promise<HomeworkResponse>}
     */
    getReadandCommentCount(noticeId: string): Promise<HomeworkResponse> {
      return this.post(urls.getReadandCommentCount, this.encryptFormData({
        noticeId: noticeId,
      }));
    }
    /**
     * checkModuleStatus
     * @param {number} moduleid module id
     * @return {Promise<HomeworkResponse>}
     */
    checkModuleStatus(moduleid: number): Promise<HomeworkResponse> {
      return this.post(urls.checkModuleStatus, this.encryptFormData({
        userid: this.userid,
        moduleid: moduleid,
      }));
    }
    /**
     * todaySign
     * @return {Promise<HomeworkResponse>}
     */
    todaySign(): Promise<HomeworkResponse> {
      return this.post(urls.todaySign, this.encryptFormData({
        userid: this.userid,
      }));
    }
    /**
     * operateLesson
     * @param {string} lessonDynamicId lessonDynamicId
     * @param {number} lessonId lessonId
     * @param {number} type type
     * @return {Promise<HomeworkResponse>}
     */
    operateLesson(lessonDynamicId: string, lessonId: number, type: number): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/lesson/operateLesson', {
        lessonDynamicId: lessonDynamicId,
        lessonId: lessonId,
        safeid: this.userid,
        type: type,
        userId: this.userid,
      });
    }
    /**
     * operateLesson
     * @param {string} lessonDynamicId lessonDynamicId
     * @param {number} lessonId lessonId
     * @param {number} type type
     * @return {Promise<HomeworkResponse>}
     */
    operateLessonInfo(lessonDynamicId: string, lessonId: number): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/lesson/operateLessonInfo', {
        lessonDynamicId: lessonDynamicId,
        lessonId: lessonId,
        safeid: this.userid,
        userId: this.userid,
      });
    }
    /**
     * operateLesson
     * @param {string} lessonDynamicId lessonDynamicId
     * @param {number} lessonId lessonId
     * @param {string} comment comment
     * @param {number} commentType commentType
     * @param {string} commentId commentId
     * @return {Promise<HomeworkResponse>}
     */
    addComment(lessonDynamicId: string, lessonId: number, comment: string, commentType: number = 0, commentId: string = ''): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/lesson/addComment', this.encryptFormData({
        lessonDynamicId: lessonDynamicId,
        lessonId: lessonId,
        safeid: this.userid,
        userId: this.userid,
      }));
    }
    /**
     * setCoursewareInfo
     * @param {string} dynamicId dynamic id
     * @param {number} type type
     * @return {Promise<HomeworkResponse>}
     */
    setCoursewareInfo(dynamicId: string, type: number): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/courseware/oprateShareDynamic', this.encryptFormData({
        dynamicid: dynamicId,
        type: type,
        userid: this.userid,
      }));
    }
    /**
     * setCoursewareInfo
     * @param {string} dynamicId dynamic id
     * @param {number} type type
     * @return {Promise<HomeworkResponse>}
     */
    coursewareDynamicData(dynamicId: string): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/courseware/oprateShareDynamicInfo', this.encryptFormData({
        dynamicid: dynamicId,
        userid: this.userid,
      }));
    }
    /**
     * listStuLessonClass
     * @param {number} page page
     * @param {number} pageSize page size
     * @param {string} bankname bankname
     * @param {string} keyword keyword
     * @return {Promise<HomeworkResponse>}
     */
    listStuLessonClass(page: number, pageSize: number = 10, bankname: string = '', keyword: string = ''): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/lesson/listStuLessonClass', this.encryptFormData({
        userId: this.userid,
        pageSize: pageSize,
        bankname: bankname,
        keyword: keyword,
        page: page,
      }));
    }
    /**
     * get chat record by student
     * @param {string} teacherid teacher id
     * @param {number} page page
     * @return {Promise<HomeworkResponse>}
     */
    getChatRecordByStudent(teacherid: string, page: number): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + '/forum/FSNoticeHome-getMessageByUser', this.encryptFormData({
        studentid: this.userid,
        teacherid: teacherid,
        page: page,
        userid: this.userid,
      }));
    }
    // #endregion StudentAPI


    /**
     ***************
     * Teacher API *
     ***************
     */
    // #region TeacherAPI
    /**
     * shareDoc
     * @param {string} userfor userfor
     * @param {string} classids class ids
     * @param {string} docid doc id
     * @param {string} studentids student ids
     * @return {Promise<HomeworkResponse>}
     */
    shareDoc(userfor: string, classids: string, docid: string, studentids: string): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/Courseware/shareDoc', this.encryptFormData({
        userfor: userfor,
        classids: classids,
        docid: docid,
        studentids: studentids,
        userid: this.userid,
      }));
    }
    /**
     * saveDocNew
     * @param {docInfo} docInfo document info
     * @return {Promise<HomeworkResponse>}
     */
    saveDocNew(docInfo: docInfo): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/Doc/saveDocNew', this.encryptFormData({
        docInfoJson: JSON.stringify(docInfo),
      }));
    }
    /**
     * create homework
     * @param {workInfo} workInfo
     * @param {number} isareanet
     * @param {string} draftid
     * @return {Promise<HomeworkResponse>}
     */
    createHomeWork(workInfo: workInfo, isareanet: number = 0, draftid: string = ''): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + 'jcservice/TeaHomeWork/createHomeWork', this.encryptFormData({
        draftid: draftid,
        workjson: workInfo,
        isareanet: isareanet,
      }));
    }
    /**
     * get chat record by teacher
     * @param {string} studentid student id
     * @param {number} page page
     * @return {Promise<HomeworkResponse>}
     */
    getChatRecordByTeacher(studentid: string, page: number): Promise<HomeworkResponse> {
      return this.post(this.baseUrl + '/forum/FSNoticeHome-getMessageByUser', this.encryptFormData({
        teacherid: this.userid,
        studentid: studentid,
        page: page,
        userid: this.userid,
      }));
    }
    // #endregion TeacherAPI


    // #region PublicAPI
    /**
     * clear message
     * @param {string} reuserid reuserid
     * @return {Promise<HomeworkResponse>} object
     */
    clearMessage(reuserid: string): Promise<HomeworkResponse> {
      return this.get(urls.clearMessage, {
        userid: this.userid,
        reuserid: reuserid,
      });
    }
    /**
     * save data
     * @return {HomeworkData}
     */
    getData(): HomeworkData {
      const data: HomeworkData = {
        userid: this.userid,
        token: this.token,
        schoolId: this.schoolId,
        cycoreId: this.cycoreId,
        displayName: this.displayName,
      };
      return data;
    }
    /**
     * set base url
     * @param {string} url url
     */
    setBaseUrl(url: string) {
      this.baseUrl = url;
    }
    /**
     * setmac
     * @param {string} mac mac
     */
    setMac(mac:string) {
      this.mac = mac;
    }
    /**
     * set machine
     * @param {string} machine machine
     */
    setMachine(machine:string) {
      this.machine = machine;
    }
    /**
     * set osVersion
     * @param {string} osVersion osVersion
     */
    setosVersion(osVersion:string) {
      this.osVersion = osVersion;
    }
    // #endregion PublicAPI


    /**
     *********************
     * Private functions *
     *********************
     */
    // #region Privatefunctions
    /**
     * get
     * @param {String} url url
     * @param {Object} data data
     * @return {Promise<Object>} object
     * @private
     */
    private get(url: string, data: object): Promise<object> {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: data,
        }).then((response) => {
          console.log(response);
        }).catch((err) => {
          reject(new Error(err));
        });
      });
    }
    /**
     * post
     * @private
     * @param {String} url url
     * @param {Object} data data
     * @return {Promise<HomeworkResponse>} object
     */
    private post(url: string, data: object): Promise<HomeworkResponse> {
      return new Promise < object >((resolve, reject) => {
        postinstance.post(url, data).then((value) => {
          if (value.data.code !== undefined && value.data.code === 1) {
            resolve(value.data);
          } else {
            reject(new Error(value.data.msg || value.data.message));
          }
        }).catch((err) => {
          reject(new Error(err));
        });
      });
    }
    /**
     * encrypt form data
     * @private
     * @param {Object} data data
     * @return {Object} encrypted data
     */
    private encryptFormData(data: object): object {
      const timestamp = new Date().valueOf();
      const obj = Object.assign(data, {
        safeid: this.userid,
        safetime: timestamp,
        // eslint-disable-next-line new-cap
        key: CryptoJS.MD5(this.userid + timestamp + 'jevictek.homework').toString(),
        mac: this.mac,
        machine: this.machine,
        platform: 'Android',
        osVersion: this.osVersion,
        apiVersion: '1.0',
      });
      if (this.token === '') {
        return obj;
      } else {
        return Object.assign(obj, {
          token: this.token,
        });
      }
    }
    // #endregion Privatefunctions
  }

  // #region interfaces
  /**
   * model of server response
   * @interface
   */
  export interface HomeworkResponse {
    code?: number;
    data?: any;
    list?: Array<any>;
    msg?: string;
    responsetime?: number;
  }

  export interface HomeworkData {
    userid: string;
    token: string;
    schoolId: string;
    cycoreId: string;
    displayName: string;
  }

  /**
   * model of homework
   * @interface
   */
  interface workInfo {
    knowledge: object & {
      bookcode: number
      bookname: string
      issended: boolean
      unitcode: number
      unitname: string
    }
    uid: string
    anwaertime: string
    workdate: string
    tips: string
    knowledgeid: string
    title: string
    lessonjson: Array<any>
      pics: Array<any>
      anwpics: Array<any>
      docids: string
    sourceorders: Array<any>
      classes: Array<any>
      studentids: string
    quesdatas: Array<object & {
      quecount: number
      perscore: number
      title: string
      startsort: number
      typeid: number
      halfscore: number
      iscorrect: string
      bigscore: string
      ques: Array<object & {
        score: number
        quesort: string
        isable: number
        answer: string
      }>
    }>
  }

  /**
   * model of sharing document
   * @interface
   */
  interface docInfo {
    title: string
    doctype: string
    docsize: number
    dir: string
    key: string
    md5code: string
    guid: string
    isconverth5: boolean
    ispublish: boolean
    agent: string
    iflyknowledge: string
    bankname: string
    category1: string
    category2: string
    categoryid: string
    categoryname: string
    isschool: boolean
    creator: string
  }
  // #endregion interfaces
  export const version = '1.0.3';
}
export default HomeworkCLI;
