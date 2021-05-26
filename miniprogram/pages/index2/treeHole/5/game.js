const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollindex: 0,
    totalnum:  4,
    starty: 0,  
    startTime:  0,
    endy: 0,
    endTime:  0,
    critical:  80,
     maxTimeCritical: 300,
     minTimeCritical: 100,
    margintop:  0,
     currentTarget: null,
    treeHoleType: "游戏区",
    avatarPath: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/people_p.svg"
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTreeHoleData()
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
    db.collection("index2_treeholes").get()
    .then(res => {
      console.log(res)
      this.setData({
        treeHoleData: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  scrollTouchStart: function (e) {
    let py =  e.touches[0].pageY,
      stamp =  e.timeStamp,
      currentTarget = e.currentTarget.id;
    console.log(py);
    this.setData({
      starty:  py,
      startTime: stamp,
      currentTarget: currentTarget
    })
  },
  scrollTouchMove(e) {
    //  console.log(e);
  },
 scrollTouchEnd: function (e) {
  let py =  e.changedTouches[0].pageY,
    stamp =  e.timeStamp,
    d =  this.data,
     timeStampdiffer = stamp - d.startTime;
   this.setData({
    endy:  py,
    endTime:  stamp
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