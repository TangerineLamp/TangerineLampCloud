// pages/index2/editPage/personalEditor.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: "", // textArea里面的细节
    chooseIndex: "", // 选择分区时各个区域的位置指数
    isChose: false, // 判断是否选择了分区
    isAnonymous: false, // 判断是否匿名, 默认不匿
    chooseRegionColor: [ // 和选择分区对应的颜色
      "theWork",
      "theExam",
      "theEmotion",
      "theLife",
      "theStudy",
      "theGame"
    ],
    chooseRegion: [
      "工作区",
      "考研区",
      "情感区",
      "生活区", 
      "学习区",  
      "游戏区",  
    ]
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
  },

  /**
   * 更换选择条的样式和内容
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chooseIndex: e.detail.value,
      isChose: true
    })
  },

  radioBindtap: function(e) {
    this.setData({
      isAnonymous: ~this.data.isAnonymous
    })
  }
})