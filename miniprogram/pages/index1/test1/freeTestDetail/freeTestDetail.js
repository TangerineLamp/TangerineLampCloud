// pages/freeTestDetail/freeTestDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testDetail:{},
  },

  //模拟云端返回数据
  clouddata:{
    tid:0,
    title:"假面人格测试",
    img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4112329300,1871547202&fm=26&gp=0.jpg",
    type:"情感",
    des:"测测你隐藏了哪些人格？测测你隐藏了哪些人格？",
    introduce_img:"",
    introduce_words:"测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情测评详情",
    price:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {tid} = options;
    wx.showLoading({
      title: '加载中',
    })
    this.getTestDetail(tid);
    wx.hideLoading();
  },

  //async???
  getTestDetail(tid) {
    // const res = await request({url:"",data:{tid}});
    let testDetail = this.clouddata;
    this.setData({
      testDetail
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