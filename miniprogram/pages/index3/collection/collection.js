// pages/index0/passage/passage.js
const db=wx.cloud.database()
const app = getApp()
const _ = db.command
let flag=true
let cnt = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passageList:[]     //文章详情列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    if(app.globalData.isLogin){
      this.getCount();
      this.getData();
    }else{
      wx.showToast({
        title: '请先登录',
        duration: 1500,
        icon: 'none',
      })
    }
    wx.hideLoading();
  },

  getData(){
    var that = this
    // 获取个人的文章收藏数据
    console.log(app.globalData.openid)
    db.collection("index0_passageCollect").orderBy('pushTime', 'desc').limit(10)
    .where({
      _openid: app.globalData.openid,
      isCollected:true
    })
    .get().then(res=>{
      console.log(res.data)
      that.setData({
        passageList: res.data
      })
    })
  },

  onReachBottom: function () {
    let oldData = this.data.passageList;
    if(oldData.length<cnt){
      wx.showLoading({
        title: '加载中',
      })
      db.collection("index0_passageCollect").orderBy('pushTime', 'desc').skip(oldData.length).limit(8).where({
        _openid: app.globalData.openid,
        isCollected:true
      }).get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          passageList:newData
        })
      })
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 1000
      })
    }
  },

  // 获得已收藏文章的数目
  getCount() {
    db.collection("index0_passageCollect").where({
      _openid: app.globalData.openid,
      isCollected:true
    }).count().then(res=>{
      cnt = res.total
    })
  },

})