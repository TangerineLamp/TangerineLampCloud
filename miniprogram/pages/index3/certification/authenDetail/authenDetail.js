// miniprogram/pages/index3/certification/authen/authenDetail/authenDetail.js

const db = wx.cloud.database();
let _id = '';
let certiType = '';
// let isCertification = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewContent:{},
    _id: null,  //  输入的id，可以详细查看验证信息
    certiType: null,  //  需要查询的数据库
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _id = options._id
    certiType = options.certiType
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      _id: _id,
      certiType: certiType
    })
    this.getReviewInfo(this.data._id);
    wx.hideLoading();
  },

  // 获取被审核人信息
  getReviewInfo(_id) {
    db.collection(this.data.certiType).doc(_id).get().then(res=>{
      this.setData({
        review:res.data,
      })
    })
  },

  // 审核通过 - 云函数实现 - NO
  // pass() {
  //   this.setData({

  //   })
  //   wx.cloud.callFunction({
  //     // 云函数名称
  //     name: 'passReview',
  //     // 传给云函数的参数
  //     data: {
  //       id: _id,
  //       isCertification:true
  //     },
  //     success: function (res) {
  //       console.log('认证状态改变成功',res)
  //     },
  //     fail: console.error
  //    })
   
  // },
  
  // 通过
  pass() {
    var that = this;
    db.collection(this.data.certiType).doc(_id).update({
      data:{
        isCertification: true,
      }
    }).then(res=>{
      console.log("通过", res)
      wx.navigateBack({
        delta: 1,
      })  
    })
  },

  // 不通过
  reject() {
    var that = this; // review
    wx.showModal({
      title:"确认信息",
      content:"确定驳回申请？",
      cancelColor: 'cancelColor',
      success(res){
        if(res.confirm){
          wx.cloud.deleteFile({
            fileList: [that.data.review.proof]
          }).then(res => {
            console.log("删除成功")
          }).catch(error => {
            // handle error
          })
          db.collection(that.data.certiType).doc(_id).remove().then(res=>{
            console.log("不通过", res)
            wx.navigateBack({
              delta: 1,
            });
          })
        }else if(res.cancel){}
      }
    })
  },
})