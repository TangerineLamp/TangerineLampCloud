// pages/index1/advice/appointmentDetail/appointmentDetail.js
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intentDay: "",
    timeSchedule: "",
    newTimeCount: 0,
    exactTime: 0,
    click:0,
    scheduleList: ["am 9:00-10:00",
      "am 10:00-11:00",
      "pm 14:00-15:00",
      "pm 15:00-16:00"],
    hoursAndMinutes: [9, 10, 11, 12, 13, 14, 15]
    // 注意单双引号的情况
  },
  //预约成功的话，如果可以的话，还要重新渲染签到的日期，日期上显示已预约
  chosen(e) {
    console.log(e.currentTarget.dataset)
    let concreteTime = e.currentTarget.dataset
    this.setData({
      timeSchedule: concreteTime
    })
    console.log("这是具体的时间段", this.data.timeSchedule)
    //这个数据库提交情况应该给某个具体的规范

  },
  chosenTime(e) {
    console.log(e.currentTarget.dataset)
    let click=e.currentTarget.dataset.classify
    let exactTime = e.currentTarget.dataset.time
    this.setData({
      exactTime: exactTime,
      click:click
    })
  },
  //整合在一起，并进行提交到数据库表单
  makeAnAppointment() {
    // var Teptime = new Date(this.data.intentDay)
    // console.log(Teptime)

    console.log(this.data.intentDay)
    console.log(this.data.intentDay._futureDay)
    var timeCount = Date.parse(this.data.intentDay._futureDay);
    var exactTime = timeCount + this.data.exactTime * 60 * 60 * 1000
    db.collection("chatroom_group").add({
      //要提交一下时间戳 格林威治时间
      //预约的时间 统一格式
      data: {
        exactTime: exactTime,
        standardTime: this.data.intentDay._futureDay,
        timeCount: timeCount,
        timeSchedule: this.data.timeSchedule

      }
    }).then(res => {
      console.log("添加成功")
    })

    wx.showToast({
      title: '预约成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //稍微有些疑惑
    //这里面要接收一下先前传过来的参数
    //var future=options.futureDay
    console.log(options)
    // console.log(future)
    this.setData({
      intentDay: options
    })
    console.log("这是预约的日期", this.data.intentDay)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})