// pages/index0/index0.js
const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    passageIconSrc: '/icons/passage-icon.jpg',
    musicIconSrc: '/icons/music-icon.jpg',
    comicIconSrc: '/icons/comic-icon.jpg',
    radioIconSrc: '/icons/radio-icon.jpg',
    contactIconSrc: '/icons/contact-icon.jpg',
    passageList: [], // 热门文章列表
    comicList: [], // 热门漫画列表
    picList: [], // 轮播图列表
    userInfo:{},
    hasUserInfo:false,
  },
  // 首页缓存
  initCache(){
    let openid=wx.getStorageSync('openid')
    let userInfo=wx.getStorageSync('userInfo')
    let hasUserInfo=wx.getStorageSync('hasUserInfo')
    let isDeveloper=wx.getStorageSync('isDeveloper');
    let isDoctor=wx.getStorageSync('isDoctor')
    let isCertiStudent=wx.getStorageSync('isCertiStudent')
    console.log('hasUserInfo',hasUserInfo)
    console.log('openid',openid)
    console.log('userInfo+',userInfo)
    console.log('我是医生',isDoctor)
    console.log('我是开发者',isDeveloper)
    console.log('我是认证学生',isCertiStudent)
    if(hasUserInfo==true){
      app.globalData.openid=openid
      app.globalData.userInfo=userInfo
      app.globalData.hasUserInfo=hasUserInfo
      app.globalData.isLogin=hasUserInfo
      app.globalData.isDeveloper=isDeveloper
      app.globalData.isDoctor=isDoctor
      app.globalData.isCertiStudent=isCertiStudent
    }
    
  },
  onLoad: function() {
    this.initCache()
    this.getPicList();
    this.getPassageList();
    this.getComicList();
  },

  //获取轮播图片列表
  getPicList() {
    var picList = []
    db.collection("index0_swiper").get().then(res=>{
      this.setData({
        picList:res.data
      })
    })
  },

  // 获取热门文章列表
  getPassageList() {
    // 文章使用长图模式展示，从passageLongPicture集合获取，数据库模式从passage集合获取
    // 降序，越新的文章排在越前面
    db.collection("index0_passageLongPicture").orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        passageList:res.data
      })
    })
  },

  // 获取热门漫画列表
  getComicList() {
    // 降序，越新的漫画排在越前面
    db.collection("index0_comic").orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        comicList:res.data
      })
    })
  },

})
