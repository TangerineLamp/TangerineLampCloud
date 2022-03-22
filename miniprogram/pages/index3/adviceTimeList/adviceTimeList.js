// miniprogram/pages/index1/advice/newDetail/newDetail.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceTimeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = this.getNowDate();
    this.getAdviceTimeList(today)
  },

  //获取当前日期以往后已被预约时间
  getAdviceTimeList(today){
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(20).where({
      isBooked:true,
      timeCount: _.gt(today),
    })
    .get().then(res=>{
      console.log("freeTime:",res.data)
      this.setData({
        adviceTimeList:res.data
      })
    })
  },

    // 工具函数 —— 获取今天的时间戳
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
    }


})