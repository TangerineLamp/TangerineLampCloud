// pages/login/login.js
var app = getApp();
Page({

  handleGetUserInfo(e){
    //  console.log(e);
     const {userInfo}=e.detail;
     wx.setStorageSync("userinfo",userInfo);
     wx.navigateBack({
       delta: 1
     });
    // 将登录后的内容放在全局变量中
    
  }

})