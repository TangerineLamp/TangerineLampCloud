// pages/index2/index2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 树洞位置
    TreeholeAddress: {
      work: "/pages/index2/treeHole/1/work",
      life: "/pages/index2/treeHole/2/life",
      emotion: "/pages/index2/treeHole/3/emotion",
      study: "/pages/index2/treeHole/4/study",
      game: "/pages/index2/treeHole/5/game",
      exam: "/pages/index2/treeHole/6/exam"},
    // 各个子树洞的图片
    work: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/work.svg",
    game: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/game.svg",
    emotion:"cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/emotion.svg",
    exam:"cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/exam.png",
    life: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/life.png",
    study:"cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/study.png",
    // 轮播图
    picList: [
      "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide0.jpg",
      "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide1.jpg",
      "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide2.jpg",
      "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index2/slide3.jpg",
    ],
    tempTreeholeName: null, // 临时存放树洞名称的地方
  },

  /**
   * 跳转到对应分区
   */
  gotoTreehole: function(res) {
    let temp = res.currentTarget.dataset.treeholename
    console.log("即将前往树洞：",temp, this.data.TreeholeAddress[temp])
    wx.navigateTo({
      url: this.data.TreeholeAddress[temp],
    })
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