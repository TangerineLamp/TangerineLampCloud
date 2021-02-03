// pages/index1/courseDetail/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseDetail:{}
  },

  //云端获取的数据
  clouddata:{
    cid:0,
    title:"强迫症",
    price:8,
    img:"https://bkimg.cdn.bcebos.com/pic/b2de9c82d158ccbf484c03131bd8bc3eb1354122?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
    des:"它是指以反复出现强迫观念和强迫动作为基础特征的一类神经强迫症性障碍。观念是以刻板形成反复进入患者意识领域的思想，表象或意向。",
    introduce_words:"课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情课程详情"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getDetail();
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 从云端获取课程详情
  */
  getDetail() {
    let courseDetail = this.clouddata;
    this.setData({
      courseDetail
    })
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