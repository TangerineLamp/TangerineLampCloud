const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var maxRoom;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[],
    openId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.initOpenID();
    wx.hideLoading();
  },

    //从云端获取房间信息
    async getRooms(openId) {
      let nowDate = this.getNowDate();
      let tomorrow = nowDate + 86400000;
      let roomList = []
      db.collection("chatroom_group").orderBy('timeCount','asc').limit(13).where({
        members: _.all([openId]),
        timeCount: _.gt(nowDate)
      })
      .get().then(res=>{
        roomList = res.data
        for(var i=0;i<roomList.length;i++){
          if(roomList[i].timeCount > tomorrow){
            roomList[i]["showCancel"] = true
          }
        }
        this.setData({
          roomList:roomList
        })
      })
    },

    //获取预约条数
    getCount(openId){
      let nowDate = this.getNowDate();
      db.collection("chatroom_group").where({
        members: _.all([openId]),
        timeCount: _.gt(nowDate)
      }).count().then(res=>{
        maxRoom = res.total
      })
    },
  
    getOpenID: async function() {
      if (this.openid) {
        return this.openid
      }
  
      const { result } = await wx.cloud.callFunction({
        name: 'login',
      })
  
      this.getRooms(result.openid);
      this.getCount(result.openid);
      return result.openid
    },
  
    async try(fn, title) {
      try {
        await fn()
      } catch (e) {
        this.showError(title, e)
      }
    },
  
    async initOpenID() {
      return this.try(async () => {
        const openId = await this.getOpenID()
  
        this.setData({
          openId,
        })
      }, '初始化 openId 失败')
    },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.roomList.length<maxRoom){
      let oldData = this.data.roomList;
      wx.showLoading({
        title: '加载中',
      })
      let nowDate = this.getNowDate();
      db.collection("chatroom_group").orderBy('timeCount','asc').skip(oldData.length).limit(8).where({
        members: _.all([this.data.openId]),
        timeCount: _.gt(nowDate)
      })
      .get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          roomList:newData
        })
      })
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 1000
      })
    }
  },

  //导航
  navTo(e){
    let timeCount = e.currentTarget.dataset.timecount;
    let groupId = e.currentTarget.dataset.groupid;
    let timeNow = Date.now();
    if(timeNow>=timeCount){
      wx.navigateTo({
        url: "/pages/index1/advice/room/room?groupId="+groupId+"&timeCount="+timeCount
      })
    }else{
      wx.showToast({
        title: "咨询未开始",
        mask:true,
        icon:"error",
        duration:1000
      })
    }
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

  // 取消预约
  cancel_advice(e){
    var that = this
    wx.showModal({
      title: '确认取消预约？',
      content: '咨询当日不可取消，一周内取消3次将被列入黑名单',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#f58220',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let groupId = e.currentTarget.dataset.groupid;
          let adviceId = e.currentTarget.dataset.adviceid;
          console.log("groupId:",groupId)
          db.collection('chatroom_group').doc(groupId).remove().then(res=>{
            console.log("删除成功")
            that.getRooms(that.data.openId)
          })
          db.collection('doctor_freeTime').doc(adviceId).update({
            data: {
              isBooked: false,
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})