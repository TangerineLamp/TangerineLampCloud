const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id} = options;
    wx.showLoading({
      title: '加载中',
    })
    this.getDetail(_id);
    wx.hideLoading();
  },

  /**
   * 从云端获取课程详情
  */
  getDetail(_id) {
    db.collection("index1_courseList").doc(_id).get().then(res=>{
      this.setData({
        courseDetail:res.data
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