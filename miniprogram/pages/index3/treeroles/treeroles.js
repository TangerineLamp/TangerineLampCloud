// pages/index3/treeroles/treeroles.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theHostOpenId: "oRKwI5j_JXmNzEkwHVj5IoLmgHZc" // 未来可换成登录者的openid，目前先用我的openid(——hrx)
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
   * 获得数据库里面的树洞数据
   */
  getTreeHoleData(){
    db.collection("index2_treeholes").get()
    .then(res => {
      // console.log(res)
      this.setData({
        treeHoleData: res.data
      })
      // 获取正确的时间格式
      var thd = [] // 暂时储存时间的列表
      for (var i=0;i<res.data.length;i++){
        // 处理时间使其按照我们的标准显示
        var year = res.data[i].time.getFullYear()
        var month = res.data[i].time.getMonth() + 1
        var day = res.data[i].time.getDate()
        var hour = res.data[i].time.getHours()
        var minu = res.data[i].time.getMinutes()
        var second = res.data[i].time.getSeconds()
        var temp ='上传时间：'+year+'-'+month+'-'+day+" "+hour+":"+minu+":"+second
        thd.push(temp)
      }
        this.setData({
        treeHoleDate: thd
      })
    }).catch(err => {
      console.log(err)
    })
  }
})