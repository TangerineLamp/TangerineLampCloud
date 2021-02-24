// pages/freeTestDetail/freeTestDetail.js

const db = wx.cloud.database();

// 收藏：默认未收藏
let isCollected = false;
let _id = ''


Page({

  /**
   * 页面的初始数据
   */
  data: {
    passage:{},
    // 默认是未收藏
    collect_img_src:"cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/passage-longPicture/icon/collect-icon.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id} = options;
    // _id= options.id
    wx.showLoading({
      title: '加载中',
    })
    this.getPassage(_id);
    wx.hideLoading();
  },

  // 获取文章内容
  getPassage(_id) {
    // 文章使用长图模式展示，从passageLongPicture集合获取，数据库模式从passage集合获取
    db.collection("index0_passageLongPicture").doc(_id).get().then(res=>{
      isCollected = res.data.isCollected
      this.setData({
        passage:res.data,
        collect_img_src: isCollected ? "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/passage-longPicture/icon/collect-active-icon.jpg" : "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/passage-longPicture/icon/collect-icon.jpg"
      })
    })
  },

  // 收藏按钮
  collectClick() {
    this.setData({
      // 已收藏，再点一下取消收藏；未收藏，点击收藏
      collect_img_src: isCollected ? "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/passage-longPicture/icon/collect-icon.jpg" : "cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/passage-longPicture/icon/collect-active-icon.jpg"
    })
    isCollected = !isCollected
    wx.cloud.callFunction({
      name: "collect",
      data:{
        id: _id,
        isCollected: isCollected
      }
    })
    .then(res => {
      console.log("改变收藏状态成功", res)
    })
    .catch(res => {
      console.log("改变收藏状态失败", res)
    })
    // // 获取openid
    // wx.cloud.callFunction({
    //   name: "login",
    //   data:{}
    // }).then(res=>{
    //   console.log(res)
    // })
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