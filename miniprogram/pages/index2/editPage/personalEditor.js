// pages/index2/editPage/personalEditor.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindTextAreaBlur: function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },

  // //提交订单或支付订单时清空备注
  // var that = this,
  // that.setData({
  //               details: '',
  //             })
})