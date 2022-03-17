const db = wx.cloud.database()
const app = getApp()
let cnt = 0; //

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result_list: [],
    openid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //  数据库获取最新的10条该用户测评结果
  getData() {
    db.collection("index1_adviceResult").orderBy('date', 'desc')
      .where({
        _openid: this.data.openid
      })
      .limit(10)
      .get()
      .then(res => {
        this.setData({
          result_list: res.data
        })
      })
  },
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
    wx.showLoading({
      title: 'loading'
    })
    this.getAdviceCount();
    this.getData();
    wx.hideLoading();
  },

    // 获得测评结果的数目
    getAdviceCount() {
      db.collection("index1_adviceResult").where({
        _openid: this.data.openid
      }).count().then(res=>{
        cnt = res.total
      })
    },

        /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let oldData = this.data.result_list;
    if(oldData.length<cnt){
      wx.showLoading({
        title: '加载中',
      })
      db.collection("index1_adviceResult").orderBy('date', 'desc').skip(oldData.length).limit(8).get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          result_list:newData
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
})