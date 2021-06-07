// miniprogram/pages/index3/certification/authen/authenDetail/authenDetail.js

const db = wx.cloud.database();
let _id = '';
// let isCertification = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewContent:{},
    _id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _id = options._id
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      _id:_id,
    })
    this.getReviewInfo(_id);
    wx.hideLoading();
  },

  // 获取被审核人信息
  getReviewInfo(_id) {
    db.collection("doctors").doc(_id).get().then(res=>{
      // isCertification = res.data.isCertification
      this.setData({
        review:res.data,
      })
    })
  },

  // 审核通过 - 云函数实现 - NO
  // pass() {
  //   this.setData({

  //   })
  //   wx.cloud.callFunction({
  //     // 云函数名称
  //     name: 'passReview',
  //     // 传给云函数的参数
  //     data: {
  //       id: _id,
  //       isCertification:true
  //     },
  //     success: function (res) {
  //       console.log('认证状态改变成功',res)
  //     },
  //     fail: console.error
  //    })
   
  // },
  
  // 通过
  pass() {
    var that = this;
    db.collection("doctors").doc(_id).update({
      data:{
        isCertification: true,
      }
    }).then(res=>{
      console.log("通过", res)
      that.getReviewInfo(that.data._id);
    })
  },

  // 不通过
  reject() {
    var that = this;
    db.collection("doctors").doc(_id).update({
      data:{
        isCertification: false,
      }
    }).then(res=>{
      console.log("不通过", res)
      that.getReviewInfo(that.data._id);
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