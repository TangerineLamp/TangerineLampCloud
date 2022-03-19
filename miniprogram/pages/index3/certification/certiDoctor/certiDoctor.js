const db = wx.cloud.database();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certiName:"",//医师姓名
    school:"",//医师所在的学校
    openid:"",//医师的openid
    doctorProof:"/icons/certi_add.png",
    isSubmit: false,//检测是否提交过
    isDoctor: false,
  },

  onLoad(){
    this.setData({
      openid: app.globalData.openid,
      isDoctor: app.globalData.isDoctor,
    })
  },

  //获取并set姓名
  handleName(e){
    this.setData({
      certiName:e.detail.value
    })
  },

  //获取并set学校
  handleSchool(e){
    this.setData({
      school:e.detail.value
    })
  },

  // 获取
  chooseCover(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          doctorProof:res.tempFilePaths[0]
        })
      },
      fail(){
        wx.showToast({
          icon:"none",
          title: '取消上传',
        })
      }
    })
  },

  // 展示提交窗口
  showPopup(){
    // 防止用户捣乱不写
    if (this.data.certiName == ""){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.school == ""){
      wx.showToast({
        title: '请填写学校',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.doctorProof == "/icons/certi_add.png")
    {
      wx.showToast({
        title: '请上传图片便于认证',
        icon: 'none',
        duration: 1500
      })
    }
    // 一切安全了才能提交
    else{
      var that = this;
      wx.showModal({
        title:"录入数据",
        content:"确定提交数据？",
        cancelColor: 'cancelColor',
        success(res){
          if(res.confirm){
            that.commit();
          }else if(res.cancel){}
        }
      })
    }
  },

  //提交数据
  commit(){
    console.log("提交成功")
    let doctorProofName = ""; //医生证书
    //判断介绍图片格式
    if(this.data.doctorProof.endsWith(".jpg")){
      doctorProofName = this.data.certiName + "_doctorProof.jpg"
    }else if(this.data.doctorProof.endsWith(".png")){
      doctorProofName = this.data.certiName + "_doctorProof.png"
    }else if(this.data.doctorProof.endsWith(".svg")){
      doctorProofName = this.data.certiName + "_doctorProof.svg"
    }
    //图片上传至云储存
    this.cloudFile(doctorProofName);
    //信息上传至数据库
    db.collection("doctors")
    .add({
      data:{
        proof:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/Certification/doctors/doctorProof/"+doctorProofName,
        isCertification: false,
        level: null,
        name: this.data.certiName,
        school: this.data.school,
        speciality: null,
      }
    })
    .then(res=>{
      wx.showToast({
        title: '提交成功',
        duration:2000,
        mask:true
      })
      this.setData({
        isSubmit: true,
      })
    })
  },

  // 储存图片至云端
  cloudFile(doctorProofName){
    wx.cloud.uploadFile({
      cloudPath:"index3/Certification/doctors/doctorProof/"+doctorProofName,
      filePath:this.data.doctorProof
    }).then(res=>{})
  },

  /**
   * 前往个人页面
   */
  toBack(){
    wx.switchTab({
      url: "/pages/index3/index3",
    })
  },
})