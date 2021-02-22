const app = getApp();
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initOpenID();
  },

    //从云端获取房间信息
    async getRooms(openID) {
      db.collection("chatroom_group").where({
        members: _.all([openID])
      })
      .get().then(res=>{
        console.log(res)
        this.setData({
          roomList:res.data
        })
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

  },
})