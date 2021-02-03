// pages/index1/wordsIndex/wordsIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:[]
  },

  clouddata:{
    words:[
      {
        wid:0,
        title:"抑郁症"
      },
      {
        wid:1,
        title:"双相障碍"
      },
      {
        wid:2,
        title:"恋爱挫折综合征"
      },
      {
        wid:3,
        title:"学习逃避症"
      },
      {
        wid:4,
        title:"网络综合症"
      },
      {
        wid:5,
        title:"考试综合征"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getWords();
    wx.hideLoading();
  },

    /**
   * 从云数据库获取数据
   */
  getWords() {
    let words = this.clouddata.words;
    this.setData({
      words
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