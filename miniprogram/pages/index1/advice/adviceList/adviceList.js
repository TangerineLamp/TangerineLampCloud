const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceList:[
      {
        startTime:"",
        chatRoomGroupId:"demo"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    let date = Date.parse('2021/02/20 12:00:0')
    this.setData({
      adviceList:[
      {
        startTime:date,
        chatRoomGroupId:"demo"
      }
    ]
    })
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