// pages/index2/addButton/addButton.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PersonalEditor: "/pages/index2/editPage/personalEditor"
  },

  /**
   * 跳转到树洞编辑页面
   */
  gotoPersonalEditor: function() {
    wx.navigateTo({
      url: this.data.PersonalEditor,
    })
  }
})