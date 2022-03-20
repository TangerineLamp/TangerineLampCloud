// miniprogram/pages/index3/adjustAdviceTime/adjustAdviceTime.js

const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

// let docId = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    docId:null,
    docInfo:null,
    freeTimeList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      docId:options._id
    })
    this.getDocInfo(options._id);
  },

  onShow(){
    this.getFreeTimeList(this.data.docId)
  },

  getDocInfo(docId){
    db.collection("doctors")
    .where({
      _openid:docId
    })
    .get()
    .then(res=>{
      this.setData({
        docInfo:res.data[0]
      })
      console.log("docInfo:",res.data[0])
    })
  },

  //从云端获取空闲时间信息
  getFreeTimeList(docId) {
    let nowDate = this.getNowDate();
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(20).where({
      doctorId: docId,
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
      url: '/pages/index3/adjustAdviceTime_open/dateChoose/dateChoose?docId='+this.data.docId,
    })
  },

  deleteFreeTime(e){
    console.log("id:",e.target.dataset.id)
    let tempid = e.target.dataset.id
    const that = this
    // 提醒用户是否要删除树洞
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (e) {
        // 点击了确定以后会删除树洞和评论
        if (e.confirm) { 
          //  删除可预约咨询时间
          db.collection('doctor_freeTime')
          .where({
            _id: tempid
          })
          .remove().then(res=>{
            // 显示删除的提示界面
            that.getFreeTimeList(that.data.docId);
            wx.showToast({
              title: '删除成功',
            })
          })
        } 
      } 
    })
  }


})