const db = wx.cloud.database();
var maxCourse;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getCourse();
    this.getCount();
    wx.hideLoading();
  },

  /**
   * 从云端获取最大课程数量
   */
  getCount(){
    db.collection("index1_courseList").count().then(res=>{
      maxCourse = res.total
    })
  },

  /**
   * 从云端获取课程数据
   */
  getCourse() {
    db.collection("index1_courseList").orderBy('pushTime', 'desc').limit(8).get().then(res=>{
      this.setData({
        courseList:res.data
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
  bottomRefresh: function () {
    if(this.data.courseList.length<maxCourse){
      let oldData = this.data.courseList;
      wx.showLoading({
        title: '加载中',
      })
      db.collection("index1_courseList").orderBy('pushTime','desc').skip(oldData.length).limit(8).get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          courseList:newData
        })
      })
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})