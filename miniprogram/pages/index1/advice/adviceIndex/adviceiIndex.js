// pages/adviceIndex/adviceiIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navToAppointment() {
    wx.navigateTo({
      url: '/pages/index1/advice/appointment/appointment'
    })
  },

  navToAdvice() {
    wx.navigateTo({
      url: '/pages/index1/advice/adviceList/adviceList'
    })
  }

})