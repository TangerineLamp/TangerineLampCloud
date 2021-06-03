const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeholeJson: "",
    treeHoleData: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let josnTemp = options.title + ""
    this.setData({
      treeholeJson: app.globalData.treehole[josnTemp]
    })
    console.log(this.data.treeholeJson)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTreeHoleData()
    console.log(this.data.treeholeJson.color)
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.data.treeholeJson.color,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
  },

  /**
   * 获得数据库里面的树洞数据
   */
  getTreeHoleData(){
    db.collection("index2_treeholes")
    .where({
      tag: this.data.treeholeJson.type
    })
    .get()
    .then(res => {
      console.log(res)
      this.setData({
        treeHoleData: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 携带树洞信息id跳转到详细数据界面里面
   */
  toDetailPage(res){
    let tempid = res.currentTarget.dataset.treeholeid
    let tempurl = "/pages/index2/detailPage/detailPage?title=" + tempid
    wx.navigateTo({
      url: tempurl,
    })
  }
})