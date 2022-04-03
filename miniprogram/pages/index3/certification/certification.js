const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isDeveloper: false,
    isDoctor: false,
    isCertiStudent: false,
    certiStudentING: false, //学生认证申请正在被审核
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: app.globalData.isLogin,
      isDeveloper: app.globalData.isDeveloper,
      isDoctor: app.globalData.isDoctor,
      isCertiStudent: app.globalData.isCertiStudent,
    })
    //this.getCertiStuING();  // 获取该用户是否正在被审核学生身份
  },

  /**
   * 获取该用户是否正在被审核学生身份
   */
  getCertiStuING(){
    db.collection("CertiStudent").where({
      _openid: app.globalData.openid,
      isCertification: false,
    }).count().then(res=>{
      console.log("certiCNT:",res)
      if(res.total>0){
        this.setData({
          certiStudentING: true,
        })
      }
    })
  },

  /**
   * 前往个人页面
   */
  toLogin(){
    wx.switchTab({
      url: "/pages/index3/index3",
    })
  },

  /**
   * 前往对应的认证界面
   */
  toCerti(option){
    var certiTemp = option.currentTarget.dataset.certitype
    if (certiTemp == "certiDoctor" && this.data.isDoctor){
      wx.showToast({
        title: '您已是认证医师',
        icon: 'none',
        duration: 1500
      })
    }
    // 学生认证正在审核
    else if (certiTemp == "certiStudent" 
    && this.data.certiStudentING){
      wx.showToast({
        title: '认证申请正在审核',
        icon: 'none',
        duration: 2000
      })
    }
    // 认证过医生就不可以认证学生了
    else if (certiTemp == "certiStudent" 
    // && (this.data.isCertiStudent || this.data.isDoctor)){
      && this.data.isCertiStudent){
      wx.showToast({
        title: '您已认证',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      // 完成位置的拼接
      let certiUrl = "/pages/index3/certification/" + certiTemp + "/" + certiTemp
      // 前往对应位置
      console.log(certiUrl)
      wx.navigateTo({
        url: certiUrl,
      })
    }
  },

})