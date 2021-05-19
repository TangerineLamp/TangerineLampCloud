const db = wx.cloud.database();
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
    treeHoleType: "情感区",
    avatarPath: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/people_r.svg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTreeHoleData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      // console.log(res)
      this.setData({
        treeHoleData: res.data
      })
      //以下是计算时间
      var thd = []
      for (var i=0;i<res.data.length;i++){
        var year = res.data[i].time.getFullYear()
        var month = res.data[i].time.getMonth() + 1
        var day = res.data[i].time.getDate()
        var hour = res.data[i].time.getHours()
        var minu = res.data[i].time.getMinutes()
        var second = res.data[i].time.getSeconds()
        var temp = year+'-'+month+'-'+day+" "+hour+":"+minu+":"+second
        thd.push(temp)
      }
        this.setData({
        treeHoleDate: thd
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
}
})