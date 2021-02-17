// pages/index2/editPage/personalEditor.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: ""
  },

  /**
   * textArea失去焦点后会将内容传到暂存的数据details里去
   * @param {失去焦点事件} e 
   */
  bindTextAreaBlur: function(e) {
    this.setData({
      details: e.detail.value,
    });
    console.log(this.data.details);
  },

  /**
   * 点击这个button后会展现一个发送的标志
   * @param {点击事件} e 
   */
  sendMsg: function(e){
    wx.showLoading({
      title: '加载中...',
    });

    // 显示发送成功
    setTimeout(function (){
      wx.hideLoading()
    }, 2000);
  }
})