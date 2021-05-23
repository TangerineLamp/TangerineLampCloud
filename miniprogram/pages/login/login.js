// pages/login/login.js
var app = getApp();
Page({

  handleGetUserInfo(e){
    //  console.log(e);
     const {userInfo}=e.detail;
     app.globalData.isLogin = true
     let page = getCurrentPages()
     let prePage = page[page.length - 2]
     prePage.setData({
       isLogin: app.globalData.isLogin
     })
     wx.setStorageSync("userinfo",userInfo);
     wx.navigateBack({
       delta: 1
     });
    // 将登录后的内容放在全局变量中
  }

})