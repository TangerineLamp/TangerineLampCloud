// pages/index3/diary/diary.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  go_back_diary(){
    wx.navigateBack({
      delta: 1
    });
      
  },
  sendNewMood(res){
    var title=res.detail.value.title;
    //var mood=res.detail.value.mood;
    var content=res.detail.value.content;
    var is_hide=res.detail.value.is_hide;
    db.collection("index3_diary").add({
      data:{
        title:title,
        content:content,
        is_hide:is_hide
      }
    }).then(res=>{
      console.log(res)
    })
    wx.showToast({
      title: '提交成功', //弹框内容
      icon: 'success',  //弹框模式
      duration: 1000    //弹框显示时间
    })
    this.go_back_diary()
  }
  /**
   * 生命周期函数--监听页面加载
   */
  ,
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

  }
})