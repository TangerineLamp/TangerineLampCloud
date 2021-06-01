const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isDeveloper: false,
    isCertiDoctor: false,
    isCertiStudent: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: app.globalData.isLogin,
      isDeveloper: app.globalData.isDeveloper,
      isCertiDoctor: app.globalData.isCertiDoctor,
      isCertiStudent: app.globalData.isCertiStudent,
    })
  },

  /**
   * 前往个人页面
   */
  toLogin(){
    wx.switchTab({
      url: "/pages/index3/index3",
    })
  },

  /**
   * 前往对应的认证界面
   */
  toCerti(option){
    var certiTemp = option.currentTarget.dataset.certitype
    if (certiTemp == "certiDoctor" && this.data.isCertiDoctor){
      wx.showToast({
        title: '您已是认证医师',
        icon: 'none',
        duration: 1500
      })
    }
    // 认证过医生就不可以认证学生了
    else if (certiTemp == "certiStudent" 
    && (this.data.isCertiStudent || this.data.isCertiDoctor)){
      wx.showToast({
        title: '您已是认证学生',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      // 完成位置的拼接
      let certiUrl = "/pages/index3/certification/" + certiTemp + "/" + certiTemp
      // 前往对应位置
      wx.navigateTo({
        url: certiUrl,
      })
    }
  },

})