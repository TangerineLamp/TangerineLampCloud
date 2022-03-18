// miniprogram/pages/index3/adjustAdviceTime_open/docList/docList.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    docList: [], // 医生列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDocList();
  },

  getDocList(){
    db.collection("doctors")
    .where({
      isCertification:true
    })
    .get()
    .then(res=>{
      console.log("res",res.data)
      this.setData({
        docList:res.data
      })
    })
  },

})