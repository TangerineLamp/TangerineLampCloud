// pages/index3/certification/authen/authen.js

const db = wx.cloud.database();
const _ = db.command;
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    isDeveloper:false,
    reviewList:[], // 审核名单（医师）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      openId: app.globalData.openid,
      isDeveloper: app.globalData.isDeveloper
    })
    wx.showLoading({
      title: '加载中'
    })
    wx.hideLoading();
  },

  onShow(){
    this.getReviewList();
  },

  // 获取审核名单（医师）
  getReviewList() {
    // 降序，越新的申请在越前面
    db.collection("doctors").orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        reviewList:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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