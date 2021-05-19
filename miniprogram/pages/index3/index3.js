// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    dailyQianDaoCount:0,
    messageCount: 0,
    treeholesCount: 0,
    collectionCount: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 跳转设置页面
  goToAddress() {
    wx.navigateTo({
      url: '/pages/index3/editor/editor',
      success: (result) => {
        console.log("跳转到设置页面")
      },
      fail: () => { },
      complete: () => { }
    });

  }
  ,
  //跳转到预约时间的界面
  jumpToAppointment() {
    wx.showLoading({
      title: "加载中",
      mask: true,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

    wx.navigateTo({
      url: '/pages/index1/advice/adviceList/adviceList',
      success: (result) => {
        console.log("跳转成功")
      },
      fail: () => { },
      complete: () => { }
    });
    wx.hideLoading();
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          app.globalData.isLogin = true
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.isLogin = true
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
