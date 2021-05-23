// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    dailyQianDaoCount:0,
    messageCount: 0,
    treeholesCount: null,  //  需要展示的树洞数量
    collectionCount: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 为了保持解耦性，这两个只能从全局变量里面获得
    openid: null, //  用户的openid
    isDeveloper: null,  //  用户的权限
    isLogin: false,  //  用户是否登录
    canIUseGetUserProfile: true,
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
    this.initOpenID() //  获得openid
    //  已经登录过了
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.isLogin,
        isDeveloper: app.globalData.isDeveloper,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.globalData.isLogin = true //  设置用户的登录状态
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: app.globalData.isLogin,
          isDeveloper: app.globalData.isDeveloper,
        })
      }
    } 
    // else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserProfile({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo  //  将用户信息变为全局变量
    //       app.globalData.isLogin = true //  设置用户的登录状态
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: app.globalData.isLogin,
    //         isDeveloper: app.globalData.isDeveloper,
    //       })
    //     }
    //   })
    // }
  },
  
  /**
   * 获取用户的昵称、头像信息
   */
  toBeLogin(e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.isLogin = true
    this.getUserTreeholeCount()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: app.globalData.isLogin,
      isLogin: app.globalData.isLogin,
    })
    console.log("胜多负少的范德萨富士达",this.data.userInfo)
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("sdfdsfsdf",this.data.userInfo)
        app.globalData.userInfo = res.userInfo
        app.globalData.isLogin = true
        this.getUserTreeholeCount()
        this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.isLogin,
        isLogin: app.globalData.isLogin,
        })
      }
    })
  },

  onShow(){
    this.getUserTreeholeCount()
  },

  /**
   * 获取自己的树洞数量
   */
  getUserTreeholeCount(){
    db.collection("index2_treeholes")
    .where({
      _openid: app.globalData.openid
    })
    .count()
    .then(res=>{
      this.setData({
        treeholesCount: res.total
      })
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
      // this.setData({
      //   openid: app.globalData.openid
      // })
      console.log(this.data.openid)
    }, '初始化 openId 失败')
  },

  getAuthority(openId){
    db.collection("developer")
    .where({
      developer:openId
    })
    .count()
    .then(res=>{
      if(res.total>0){
        app.globalData.isDeveloper = true
        // console.log(app.globalData.isDeveloper)
        this.setData({
          isDeveloper:app.globalData.isDeveloper
        })
      }
    })
  }
})
