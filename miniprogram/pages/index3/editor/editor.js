// pages/index3/editor/editor.js
const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clear(){
      wx.clearStorageSync();
      wx.showToast({
        title: '您已成功清除缓存',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          console.log("Clearing is successful")
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      let testUserInfo=wx.getStorage({
        key: 'userInfo',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      console.log(testUserInfo)
      app.globalData.isLogin=false
      app.globalData.hasUserInfo=false
      // wx.switchTab({
      //   url: '/pages/index3/index3',
      //   success: (result) => {
      //     console.log("清除缓存后返回tab")
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });
      wx.reLaunch({
        url: '/pages/index3/index3',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
        
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