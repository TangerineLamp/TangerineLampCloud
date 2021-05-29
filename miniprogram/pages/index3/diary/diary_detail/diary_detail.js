// pages/index3/diary/diary_detail/diary_detail.js
const db = wx.cloud.database()
let ID = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary_detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  delete() {
    console.log(ID)
    wx.showModal({
      title: 'confirm',
      content: '您确定要删除吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          db.collection("index3_diary").doc(ID).remove()
            .then(res => {
              console.log("删除成功")
            })
        }
      },
      fail: () => { },
      complete: () => { }
    });



    //这里的逻辑需要修改，跳转不正常
    // wx.redirectTo({
    //   url: '/pages/index3/diary/diary',
    //   success: (result) => {

    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });

    // wx.navigateTo({
    //   url: '/pages/index3/diary/diary',
    //   success: (result) => {
    //       console.log("跳转回日志界面成功")
    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });

  },
  getData(_id) {
    db.collection("index3_diary").doc(_id).get()
      .then(res => {
        this.setData({
          diary_detail: res.data
        })
      })
  },
  onLoad: function (options) {
    ID = options._id;
    console.log(options);
    const { _id } = options;
    //也可以使用options.id
    wx.showLoading({
      title: '加载中',
    })
    this.getData(_id);
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