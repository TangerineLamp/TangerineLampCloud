// pages/index2/index2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TreeholeAddress: [  //  树洞位置
      "/pages/index2/treeHole/1/work",
      "/pages/index2/treeHole/2/life",
      "/pages/index2/treeHole/3/emotion",
      "/pages/index2/treeHole/4/study",
      "/pages/index2/treeHole/5/game",
      "/pages/index2/treeHole/6/exam"],
    picLsit: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var picList = []
    picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide0.jpg")
    picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide1.jpg")
    picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide2.jpg")
    picList.push("cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide3.jpg")
    this.setData({
      picList: picList,
    })
    // console.log('图片列表',picList)
  },


  /**
   * 跳转到对应分区
   */
  gotoTreehole: function(temp) {
    wx.navigateTo({
      url: this.data.TreeholeAddress[temp],
    })
  },

  /**
   * 前往1~6号树洞
   */
  gotoTreehole_1: function() {
    this.gotoTreehole(0)
  },
  gotoTreehole_2: function() {
    this.gotoTreehole(1)
  },
  gotoTreehole_3: function() {
    this.gotoTreehole(2)
  },
  gotoTreehole_4: function() {
    this.gotoTreehole(3)
  },
  gotoTreehole_5: function() {
    this.gotoTreehole(4)
  },
  gotoTreehole_6: function() {
    this.gotoTreehole(5)
  },

  /**
   * 跳转到树洞编辑页面
   */
  gotoPersonalEditor: function() {
    // 提示如果已经登录了就可以发树洞
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: app.globalData.toPersonalEditPage
      })
    }
    // 如果没有登录则提醒先登录
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
    })
    }
  }
})