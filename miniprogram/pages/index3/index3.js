// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    dailyQianDaoCount:0,
    messageCount: 0,
    treeholesCount: 0,
    collectionCount: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isDeveloper: null
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

  /**
   * 加载需要页面的各种信息和内容，包括可能的用户信息和权限
   */
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isDeveloper: app.globalData.isDeveloper
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isDeveloper: app.globalData.isDeveloper
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo  //  将用户信息变为全局变量
          app.globalData.isLogin = true //  设置用户的登录状态
          this.initOpenID()
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isDeveloper: app.globalData.isDeveloper
          })
        }
      })
    }
  },
  
  /**
   * 获取用户的昵称、头像信息
   */
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.isLogin = true
    this.initOpenID()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  ///////////////////////获取openid并识别开发人员的一些列操作/////////////////////
  getOpenID: async function() {
    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })
    return result.openid
  },

  async try(fn, title) {
    try {
      await fn()
    } catch (e) {
      this.showError(title, e)
    }
  },

  async initOpenID() {
    return this.try(async () => {
      const openId = await this.getOpenID()

      this.getAuthority(openId);

      app.globalData.openid = openId
      console.log(app.globalData.openid)
      // this.setData({
      //   openId,
      // })
    }, '初始化 openId 失败')
  },

  getAuthority(openId){
    db.collection("developer").where({
      developer:openId
    }).count().then(res=>{
      if(res.total>0){
        app.globalData.isDeveloper = true
        console.log(app.globalData.isDeveloper)
        this.setData({
          isDeveloper:app.globalData.isDeveloper
        })
      }
    })
  }
})
