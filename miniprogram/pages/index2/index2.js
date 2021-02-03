// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TreeholeAddress: [
      "/pages/index2/treeHole/1/work",
      "/pages/index2/treeHole/2/life",
      "/pages/index2/treeHole/3/emotion",
      "/pages/index2/treeHole/4/study",
      "/pages/index2/treeHole/5/game",
      "/pages/index2/treeHole/6/exam"],
    PersonalEditor: "/pages/index2/editPage/personalEditor"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 跳转到对应分区
   */
  gotoTreehole: function(temp) {
    wx.navigateTo({
      url: this.data.TreeholeAddress[temp],
    })
  },

  /**
   * 前往1~6号树洞
   */
  gotoTreehole_1: function() {
    this.gotoTreehole(0)
  },
  gotoTreehole_2: function() {
    this.gotoTreehole(1)
  },
  gotoTreehole_3: function() {
    this.gotoTreehole(2)
  },
  gotoTreehole_4: function() {
    this.gotoTreehole(3)
  },
  gotoTreehole_5: function() {
    this.gotoTreehole(4)
  },
  gotoTreehole_6: function() {
    this.gotoTreehole(5)
  },

  /**
   * 跳转到树洞编辑页面
   */
  gotoPersonalEditor: function() {
    wx.navigateTo({
      url: this.data.PersonalEditor,
    })
  }
})