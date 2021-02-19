// pages/freeTestDetail/freeTestDetail.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passage:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id} = options;
    wx.showLoading({
      title: '加载中',
    })
    this.getPassage(_id);
    wx.hideLoading();
  },

  //获取文章内容
  getPassage(_id) {
    // 文章使用长图模式展示，从passageLongPicture集合获取，数据库模式从passage集合获取
    db.collection("index0_passageLongPicture").doc(_id).get().then(res=>{
      this.setData({
        passage:res.data
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