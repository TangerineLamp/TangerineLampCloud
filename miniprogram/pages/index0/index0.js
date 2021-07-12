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
  },
 
  onLoad: function() {
    var that = this
    var picList = []
    // picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/index0/slide0.jpg")
    // picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/index0/slide1.jpg")
    // picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/index0/slide2.jpg")
    // picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/index0/slide3.jpg")
    this.getPassageList();
    this.getComicList();
    that.setData({
      picList: picList,
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
