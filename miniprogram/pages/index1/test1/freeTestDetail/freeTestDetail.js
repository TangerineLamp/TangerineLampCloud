const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id} = options;
    wx.showLoading({
      title: '加载中',
    })
    this.getTestDetail(_id);
    wx.hideLoading();
  },

  getTestDetail(_id) {
    db.collection("index1_freeTestList").doc(_id).get().then(res=>{
      this.setData({
        testDetail:res.data
      })
    })
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

    //导航到对应测试页面
    navTo(){
      wx.navigateTo({
        url: this.data.testDetail.url,
      })
    }

})