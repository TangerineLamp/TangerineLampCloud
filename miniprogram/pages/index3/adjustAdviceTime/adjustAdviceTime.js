// miniprogram/pages/index3/adjustAdviceTime/adjustAdviceTime.js

const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:null,
    docInfo:null,
    freeTimeList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDocInfo("oRKwI5p-MekyCkEb8fTvlUntbZKw")
    
    //↓因为每次都要登录才能用global的openId，先占个位↓

    //this.getDocInfo(app.globalData.openId);
    // this.setData({
    //   openId:app.globalData.openId,
    // })
  },

  onShow(){
    this.getFreeTimeList(app.globalData.openId)
    //this.getFreeTimeList(app.globalData.openId)
  },

  getDocInfo(openId){
    db.collection("doctors")
    .where({
      doctorId:openId,
      isCertification:true
    })
    .get()
    .then(res=>{
      console.log("docInfo:",res.data[0])
      this.setData({
        docInfo:res.data[0]
      })
    })
  },

  //从云端获取空闲时间信息
  getFreeTimeList(openId) {
    let nowDate = this.getNowDate();
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(13).where({
      doctorId: openId,
      timeCount: _.gt(nowDate)
    })
    .get().then(res=>{
      console.log("freeTime:",res)
      this.setData({
        freeTimeList:res.data
      })
    })
  },

  getNowDate(){
    let timestamp = Date.parse(new Date());
    let nowTime = new Date(timestamp);
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth();
    let date = nowTime.getDate();
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    let time = year + "/" + month + "/" + date;
    let nowDate = Date.parse(new Date(time));
    return nowDate;
  },

  addTime(){
    wx.navigateTo({
      url: '/pages/index3/adjustAdviceTime/dateChoose/dateChoose',
    })
  }


})