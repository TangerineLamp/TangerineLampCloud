// pages/index1/advice/appointmentDetail/appointmentDetail.js
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    masterList:[],
    openId:"",
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
    var startTimeCount = Date.parse(this.data.intentDay._futureDay);
    var exactTime = startTimeCount + this.data.exactTime * 60 * 60 * 1000;
    var groupId = this.data.openId+Date.now();
    //!!!这里是房间中添加心理咨询师openid逻辑
    var members = [this.data.openId,"oRKwI5p-MekyCkEb8fTvlUntbZKw"];

    db.collection("chatroom_group").where({
      timeCount:exactTime
    }).count().then(res=>{
      if(res.total>0){
        wx.showToast({
          title: '预约失败，已被预约',
          icon:"none",
          duration:1500
        })
      }else{
        db.collection("chatroom_group").add({
          //要提交一下时间戳 格林威治时间
          //预约的时间 统一格式
          data: {
            timeCount: exactTime,
            standardTime: this.data.intentDay._futureDay,
            startTimeCount: startTimeCount,
            timeSchedule: this.data.timeSchedule,
            hours:this.data.exactTime,
            groupId: groupId,
            members:members
          }
        }).then(res => {
          console.log("添加成功")
        })
    
        wx.showToast({
          title: '预约成功',
          icon: "success",
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
    
          },
          fail: () => { },
          complete: () => { }
        })
      }
    })

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
    //↓获取openID
    this.initOpenID();
    //↓获取心理咨询老师
    this.getDoctor();
  },

  // 第二层，用云函数获取openId
  getOpenID: async function() {
    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })
    return result.openid
  },

  //try方法
  async try(fn, title) {
    try {
      await fn()
    } catch (e) {
      this.showError(title, e)
    }
  },

  //第一层，初始化openID
  async initOpenID() {
    return this.try(async () => {
      const openId = await this.getOpenID()
      this.setData({
        openId,
      })
    }, '初始化 openId 失败')
  },

    //获取心理咨询老师的openid列表
    getDoctor() {
      
    }

})