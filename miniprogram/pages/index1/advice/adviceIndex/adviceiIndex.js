// pages/adviceIndex/adviceiIndex.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  outerAppointment(){
    wx.navigateTo({
      url: '/pages/index1/advice/outerAppointment/outerAppointment'
    })
    // wx.showToast({
    //   title: '暂未开通',
    //   icon: 'none',
    //   duration: 1000
    // })
  },

  navToAppointment() {
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: '/pages/index1/advice/appointment/appointment'
      })
    }
    // 如果没有登录则提醒先登录
    else{
      wx.switchTab({
        url: '/pages/index3/index3',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  },

  navToAdvice() {
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: '/pages/index1/advice/adviceList/adviceList'
      })
    }
    // 如果没有登录则提醒先登录
    else {
      wx.switchTab({
        url: '/pages/index3/index3',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  }

})