// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    dailyQianDaoCount:0,
    year:0,
    month:0,
    messageCount: 0,    //  需要展示的消息数量
    treeholesCount: 0,  //  需要展示的树洞数量
    collectionCount: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 为了保持解耦性，这两个只能从全局变量里面获得
    openid: null, //  用户的openid
    isDeveloper: false,  //  用户的权限
    isDoctor:false,
    isCertiStudent:false,
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

  },

  /**
   * 加载需要页面的各种信息和内容，包括可能的用户信息和权限
   */
  onLoad() {
    let userInfo = wx.getStorageSync('userInfo')
    let hasUserInfo=wx.getStorageSync('hasUserInfo')
    let isDeveloper=wx.getStorageSync('isDeveloper');
    let isDoctor=wx.getStorageSync('isDoctor')
    let isCertiStudent=wx.getStorageSync('isCertiStudent')
    console.log('hasUserInfo',hasUserInfo)
    console.log('userInfo+',userInfo)
    console.log('我是医生',isDoctor)
    console.log('我是开发者',isDeveloper)
    console.log('我是认证学生',isCertiStudent)
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    console.log(month)
    this.setData({
      year:year,
      month:month
    })
    this.initOpenID() //  获得openid
    //  已经登录过了
    // 清除缓存的时候要先更新
    this.data.hasUserInfo=app.globalData.hasUserInfo
    if (app.globalData.isLogin||hasUserInfo==true) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: hasUserInfo,
        isDeveloper:isDeveloper,
        isDoctor:isDoctor,
        isCertiStudent:isCertiStudent
      })
      app.globalData.isLogin=hasUserInfo
      app.globalData.hasUserInfo=hasUserInfo
      app.globalData.isDeveloper=isDeveloper
      app.globalData.isDoctor=isDoctor
      app.globalData.isCertiStudent=isCertiStudent
      this.setData({
        isLogin: app.globalData.isLogin,
        isDeveloper: app.globalData.isDeveloper,
        isDoctor: app.globalData.isDoctor,
        isCertiStudent:app.globalData.isCertiStudent,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.globalData.isLogin = true
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: app.globalData.isLogin,
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
   * 登录按钮绑定的事件
   * 在经过用户的允许后获得用户的个人信息
   */
  // 登录
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("从getUserProfile里面获得信息",this.data.userInfo)
        // 先将所有的信息传到全局变量里面
        console.log(res)
        app.globalData.userInfo = res.userInfo
        app.globalData.isLogin = true
        this.getUserTreeholeCount() //  获取树洞数量
        this.getcollectionCount() //获取收藏
        // 将全局变量中的内容获取到本页
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: app.globalData.isLogin,
          isLogin: app.globalData.isLogin,
          isDeveloper: app.globalData.isDeveloper,
          isDoctor: app.globalData.isDoctor,
        })
        wx.setStorageSync('userInfo', res.userInfo);
        wx.setStorageSync('hasUserInfo',true);
        wx.setStorageSync('isDeveloper', app.globalData.isDeveloper);
        wx.setStorageSync('isDoctor',app.globalData.isDoctor);
        wx.setStorageSync('isCertiStudent',app.globalData.isCertiStudent);
      }
    })
  },

  onShow(){
    this.getUserTreeholeCount()
    this.getUserMessageCount()
    this.getdailyQianDaoCount()
    this.getcollectionCount()
    this.data.hasUserInfo=app.globalData.hasUserInfo
    console.log(this.data.hasUserInfo)
  },
  /**
   * 获取自己的签到天数
   */
  getdailyQianDaoCount(){
    db.collection("index3_qiandao_daily")
    .where({
      _openid: app.globalData.openid,
      month: this.data.month,
      year:this.data.year
    })
    .count()
    .then(res=>{
      this.setData({
        dailyQianDaoCount: res.total
      })
    })
  },
    /**
   * 获取自己的文章收藏数量
   */
  getcollectionCount(){
    db.collection("index0_passageCollect").where({
      _openid: app.globalData.openid,
      isCollected:true
    })
    .count()
    .then(res=>{
      this.setData({
        collectionCount: res.total
      })
    })
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

  /**
   * 获得所有给自己的评论
   */
  getUserMessageCount(){
    db.collection("index2_comments")
    .where(_.and([
      {
        _openid: _.not(_.eq(app.globalData.openid))
      },
      {
        toID: app.globalData.openid
      },
      {
        isRead: false
      }
    ]))
    .count()
    .then(res=>{
      this.setData({
        messageCount: res.total
      })
    })
  },
  
  /**
   * 前往认证通道
   */
  toCerti(){
    // 登录了才可以认证
    if (this.data.isLogin){
      wx.navigateTo({
        url: '/pages/index3/certification/certification',
      })
    }
    // 否则提示要登录
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }
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
      this.getDoctorAuth(openId);
      this.getCertiStudentAuth(openId);
      app.globalData.openid = openId
      // this.setData({
      //   openid: app.globalData.openid
      // })
      console.log("当前用户的openid为",app.globalData.openid)
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
        console.log("用户是否有权限",app.globalData.isDeveloper)
      }
    })
  },

  getDoctorAuth(openId){
    db.collection("doctors")
    .where({
      doctorId:openId,
      isCertification:true
    })
    .count()
    .then(res=>{
      if(res.total>0){
        app.globalData.isDoctor = true
      }
      console.log("用户是否是心理咨询师",app.globalData.isDoctor)
    })
  }
  ,
  getCertiStudentAuth(openId){
    db.collection("CertiStudent")
    .where({
      openid:openId
    })
    .count()
    .then(res=>{
      console.log(res)
      if(res.total>0){
        app.globalData.isCertiStudent = true
      }
      console.log("用户是否是认证学生",app.globalData.isCertiStudent)
    })
  }
})
