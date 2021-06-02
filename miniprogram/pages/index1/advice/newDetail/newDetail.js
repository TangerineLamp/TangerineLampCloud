// miniprogram/pages/index1/advice/newDetail/newDetail.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:null,
    tomorrow:null,
    freeTimeList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = Date.parse(options._futureDay);
    let tomorrow = today + 86400000;
    this.setData({
      today:today,
      tomorrow:tomorrow,
    })
    this.getFreeTimeList(today,tomorrow)
  },

  //获取当前日期可预约医生及时间段信息
  getFreeTimeList(today,tomorrow){
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(20).where({
      isBooked:false,
      timeCount: _.and(_.gt(today), _.lt(tomorrow))
    })
    .get().then(res=>{
      console.log("freeTime:",res.data)
      this.setData({
        freeTimeList:res.data
      })
    })
  },

  // 预约点击事件
  adviceTap(){

  }

})