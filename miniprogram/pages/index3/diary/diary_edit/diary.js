// pages/index3/diary/diary.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSrc: false,
    pictures: ""
  },
  go_back_diary() {
    // wx.navigateBack({
    //   delta: 1
    // });
    wx.navigateTo({
      url: '/pages/index3/diary/diary',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  uploadPic() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pictures: res.tempFilePaths[0]
        })
      },
      fail() {
        wx.showToast({
          icon: "none",
          title: '上传失败',
        })
      }
    })
    this.setData({
      isSrc: true
    })
    console.log(this.data.isSrc)
  },
  
  cloudfile(picName) {
    console.log("开始上传")
    wx.cloud.uploadFile({
      cloudPath: "index3/diary/" + picName,
      filePath: this.data.pictures
    }).then(res => {
      console.log("成功上传到云端")
    })
  }
  ,
  sendNewMood(res) {

    let picName = ""
    var title = res.detail.value.title;
    //var mood=res.detail.value.mood;
    var content = res.detail.value.content;
    var is_hide = res.detail.value.is_hide;

    //判断图片格式
    if (this.data.pictures.endsWith(".jpg")) {
      picName = title + "_pic.jpg"
    } else if (this.data.cover.endsWith(".png")) {
      picName = title + "_pic.png"
    } else if (this.data.cover.endsWith(".svg")) {
      picName = title + "_pic.svg"
    }
    if (picName != "") {
      console.log(picName)
      //上传至云端
      this.cloudfile(picName)
    }

    db.collection("index3_diary").add({
      data: {
        title: title,
        content: content,
        is_hide: is_hide,
        pic: "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index3/diary/" + picName
        //pictures:pictures
      }
    }).then(res => {
      console.log(res)
    })
    this.setData({
      pictures: "",
      isSrc: false
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