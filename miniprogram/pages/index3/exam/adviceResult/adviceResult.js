// miniprogram/pages/index3/exam/adviceResult/adviceResult.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testName: "",
    advice: "",
    partScores: [],
    totalScores: 0,
    totalColor: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _id = options._id;
    this.getResult(_id);
  },

  getResult(_id){
    db.collection("index1_adviceResult").doc(_id).get()
    .then(res=>{
      let data = res.data;
      this.setData({
        _id:_id,
        testName: data.testName,
        advice: data.advice,
        partScores: data.partScores,
        totalScores: data.totalScores,
        totalColor: data.totalColor?data.totalColor:"",
      })
    })
  },

  deleteResult(e){
    const that = this
    // 提醒用户是否要删除结果
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (e) {
        // 点击了确定以后会删除测评结果
        if (e.confirm) { 
          //  删除该条测评结果记录
          db.collection('index1_adviceResult')
          .doc(that.data._id)
          .remove().then(res=>{
            // 显示删除的提示界面
            wx.navigateBack({
              delta: 1,
            })
          })
        } 
      } 
    })
  }

})