// pages/index3/diary/diary.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary_list: [],
    openid: "",
    _id: ""
  },
  // sendNewMood(res){
  //   var title=res.detail.value.title;
  //   //var mood=res.detail.value.mood;
  //   var content=res.detail.value.content;
  //   var is_hide=res.detail.value.is_hide;
  //   db.collection("index3_diary").add({
  //     data:{
  //       title:title,
  //       content:content,
  //       is_hide:is_hide
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // }
  /**
   * 生命周期函数--监听页面加载
   */

  //跳转页面
  go_to_edit() {
    wx.navigateTo({
      url: "/pages/index3/diary/diary_edit/diary"
    });

  },
  //  数据库获取最新的20条日志(参数可修改), 对应数据库里某一个用户下所有数据
  getData() {
    db.collection("index3_diary")
      .where({
        _openid: this.data.openid
      })
      .limit(20)
      .get()
      .then(res => {
        this.setData({
          diary_list: res.data
        })
      })
  },
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
    console.log(this.data.openid)
    wx.showLoading({
      title: 'loading'
    })
    this.getData();
    wx.hideLoading();
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
    this.getData();
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

  }
})