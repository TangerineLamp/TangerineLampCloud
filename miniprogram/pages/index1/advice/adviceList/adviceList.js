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
      db.collection("chatroom_group").orderBy('timeCount','asc').limit(13).where({
        members: _.all([openId])
      })
      .get().then(res=>{
        this.setData({
          roomList:res.data
        })
      })
    },

    //获取预约条数
    getCount(openId){
      db.collection("chatroom_group").where({
        members: _.all([openId])
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
      db.collection("chatroom_group").orderBy('timeCount','asc').skip(oldData.length).limit(8).where({
        members: _.all([this.data.openId])
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
    let timeCount = e.target.dataset.timecount;
    let groupId = e.target.dataset.groupid;
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
  }
})