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
    reviewList:[], // 审核名单（学生）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      openId: app.globalData.openid,
      isDeveloper: app.globalData.isDeveloper,
      _type: "CertiStudent",
    })
    wx.showLoading({
      title: '加载中'
    })
    wx.hideLoading();
  },

  onShow(){
    this.getReviewList();
  },

  // 获取审核名单（学生）
  getReviewList() {
    // 降序，越新的申请在越前面
    db.collection("CertiStudent").where({
      isCertification: false
    }).orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        reviewList:res.data
      })
    })
  },
})