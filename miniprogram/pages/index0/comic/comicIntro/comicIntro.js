// miniprogram/pages/index0/comic/comicContent/comicIntro.js

// 漫画内容
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comic:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id} = options;
    wx.showLoading({
      title: '加载中',
    })
    this.getComic(_id);
    wx.hideLoading();
  },

  //获取文章内容
  getComic(_id) {
    db.collection("index0_comic").doc(_id).get().then(res=>{
      this.setData({
        comic:res.data
      })
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