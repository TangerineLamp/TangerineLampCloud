// pages/index2/treeHole/1/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PersonalEditor: "/pages/index2/editPage/personalEditor",
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
  wx.navigateTo({
    url: this.data.PersonalEditor,
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