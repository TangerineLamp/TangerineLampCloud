// miniprogram/pages/index3/adjustAdviceTime/hoursChoose/hoursChoose.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    masterList:[],
    openId:null,
    docInfo:null,
    intentDay: "",
    timeSchedule: "",
    newTimeCount: 0,
    exactTime: "",
    exactMin:"00",
    nextHour:"",
    nextMinute:"",
    click:0,
    choice:0,
    scheduleList: ["am 9:00-10:00",
      "am 10:00-11:00",
      "pm 14:00-15:00",
      "pm 15:00-16:00"],
    hoursAndMinutes: [9,10,11,12,13,14,15,16,17,18,19]
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
  
  getDocInfo(openId){
    db.collection("doctors")
    .where({
      _openid:openId,
    })
    .get()
    .then(res=>{
      this.setData({
        docInfo:res.data[0]
      })
    })
  },
  chooseFreeTime(e){
      var s=e.detail.value
      var str=s.split(':')
      console.log("测试字符串分割",s,str);
      var hours=parseInt(str[0])
      var minutes=parseInt(str[1])
      var tempMin=str[1]
      console.log(hours,minutes)
      if(minutes<10){
        tempMin="0"+minutes
      }
      var nextHour = (minutes<10)?hours:hours+1;
      var nextMinute = (minutes+50) % 60;
      var tempNextMinute = "";
      if(nextMinute<10){
        tempNextMinute="0"+nextMinute.toString();
      }else{
        tempNextMinute=nextMinute.toString();
      }
      this.setData({
        exactTime:hours,
        exactMin:tempMin,
        click:hours,
        choice:0,
        nextHour:nextHour,
        nextMinute:tempNextMinute,
      })
      // this.setData({
      //   chooseIndex: e.detail.value,
        

      // })
    
  },
  chosenTime(e) {
    console.log(e.currentTarget.dataset)
    let click=e.currentTarget.dataset.classify
    let exactTime = e.currentTarget.dataset.time
    let nextMinute = "50"
    this.setData({
      exactTime: exactTime,
      click:click,
      exactMin:"00",
      nextHour:exactTime,
      nextMinute:nextMinute,
    })
    console.log(this.data.exactTime)
  },
  //整合在一起，并进行提交到数据库表单
  makeAnAppointment() {
    // var Teptime = new Date(this.data.intentDay)
    // console.log(Teptime)
    var tempMin=parseInt(this.data.exactMin)
    var startTimeCount = Date.parse(this.data.intentDay._futureDay);
    var exactTimeCount = startTimeCount 
            + this.data.exactTime * 60 * 60 * 1000
            + tempMin*60*1000
    var groupId = this.data.openId+Date.now();
    //!!!这里是房间中添加心理咨询师openid逻辑
    var members = [this.data.openId,"oRKwI5p-MekyCkEb8fTvlUntbZKw"];

    db.collection("doctor_freeTime")
    .where({
      doctorId:this.data.openId,
      timeCount:exactTimeCount
    })
    .count()
    .then(res=>{
      if(res.total>0){
        wx.showToast({
          title: '该时间段已存在',
          icon: 'none',
          duration:1000,
        })
      }else{
        wx.showModal({
          title: '您确认添加吗',
          content: '',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if(result.confirm){
            db.collection("doctor_freeTime").add({
            data:{
              //经过计算最后折合的时间戳
              timeCount:exactTimeCount,
              standardTime: this.data.intentDay._futureDay,
            // 从零点开始的时间戳
              startTimeCount: startTimeCount,
              doctorId:this.data.openId,
              name:this.data.docInfo.name,
              level:this.data.docInfo.level,
              speciality:this.data.docInfo.speciality,
              docSelfPic:this.data.docInfo.docSelfPic,
              isBooked:false,
              school: this.data.docInfo.school,
            }
        }).then(res=>{
          wx.navigateBack({
            delta: 2,
          })
          wx.showToast({
            title: '添加成功',
          })
          console.log("添加成功")
        })
            }
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    })
    
    // db.collection("chatroom_group").where({
    //   timeCount:exactTime
    // }).count().then(res=>{
    //   if(res.total>0){
    //     wx.showToast({
    //       title: '预约失败，已被预约',
    //       icon:"none",
    //       duration:1500
    //     })
    //   }else{
    //     db.collection("chatroom_group").add({
    //       //要提交一下时间戳 格林威治时间
    //       //预约的时间 统一格式
    //       data: {
    //         timeCount: exactTime,
    //         standardTime: this.data.intentDay._futureDay,
    //         startTimeCount: startTimeCount,
    //         timeSchedule: this.data.timeSchedule,
    //         hours:this.data.exactTime,
    //         groupId: groupId,
    //         members:members
    //       }
    //     }).then(res => {
    //       console.log("添加成功")
    //     })
    
    //     wx.showToast({
    //       title: '预约成功',
    //       icon: "success",
    //       image: '',
    //       duration: 1500,
    //       mask: false,
    //       success: (result) => {
    
    //       },
    //       fail: () => { },
    //       complete: () => { }
    //     })
    //   }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //稍微有些疑惑
    //这里面要接收一下先前传过来的参数
    //var future=options.futureDay
    //获取医生的信息
    console.log(options)
    this.getDocInfo(options.docId);
    this.setData({
      openId:options.docId,
    })
    console.log(this.data.openId)

    // console.log(future)
    this.setData({
      intentDay: options
    })
    console.log("这是预约的日期", this.data.intentDay)
    //↓获取openID
    // this.initOpenID();
    //↓获取心理咨询老师
    // this.getDoctor();
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