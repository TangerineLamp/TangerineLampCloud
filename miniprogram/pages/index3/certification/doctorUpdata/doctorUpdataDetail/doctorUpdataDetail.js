const db = wx.cloud.database();
const app = getApp()
let _id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certiName:"", //  医师姓名
    school:"",  //  医师所在的学校
    _id:"", // 医师信息的_id
    doctorProof:"/icons/certi_add.png",
    doctorSelfPic: "/icons/certi_add.png",
    level: "",
    spec: "",
  },

  onLoad(){
    _id = this.options._id
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      _id: _id,
    })
    this.getDoctor(this.data._id);
    wx.hideLoading();
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

  //获取并set等级
  handleLevel(e){
    this.setData({
      level: e.detail.value
    })
  },

  //获取并set专长
  handleSpec(e){
    this.setData({
      spec: e.detail.value
    })
  },

  // 获取证书
  // chooseCoverProof(){
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     success (res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         doctorProof:res.tempFilePaths[0]
  //       })
  //     },
  //     fail(){
  //       wx.showToast({
  //         icon:"none",
  //         title: '取消上传',
  //       })
  //     }
  //   })
  // },

  // 获取照片
  chooseCoverSelfPic(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          doctorSelfPic:res.tempFilePaths[0]
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
    else if (this.data.level == ""){
      wx.showToast({
        title: '请填写等级',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.spec == ""){
      wx.showToast({
        title: '请填写专长',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.doctorProof == "/icons/certi_add.png" || this.data.doctorSelfPic == "/icons/certi_add.png")
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
    console.log("更新成功")
    let doctorProofName = ""; // 医生证书
    let doctorSelfPicName = ""; // 医生照片
    
    //判断介绍图片格式并重命名
    if(this.data.doctorProof.endsWith(".jpg")){
      doctorProofName = this.data.certiName + "_doctorProof.jpg"
    }else if(this.data.doctorProof.endsWith(".png")){
      doctorProofName = this.data.certiName + "_doctorProof.png"
    }else if(this.data.doctorProof.endsWith(".svg")){
      doctorProofName = this.data.certiName + "_doctorProof.svg"
    }
    if(this.data.doctorProof.endsWith(".jpg")){
      doctorSelfPicName = this.data.certiName + "_doctorSelfPic.jpg"
    }else if(this.data.doctorProof.endsWith(".png")){
      doctorSelfPicName = this.data.certiName + "_doctorSelfPic.png"
    }else if(this.data.doctorProof.endsWith(".svg")){
      doctorSelfPicName = this.data.certiName + "_doctorSelfPic.svg"
    }

    //图片上传至云储存
    this.cloudFile(doctorProofName, doctorSelfPicName);

    //信息上传至数据库
    db.collection("doctors").doc(this.data._id)
    .update({
      data:{
        proof:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/Certification/doctors/doctorProof/"+doctorProofName,
        docSelfPic:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/Certification/doctors/doctorSelfPic/"+doctorSelfPicName,
        level: this.data.level,
        name: this.data.certiName,
        school: this.data.school,
        speciality: this.data.spec,
      }
    })
    .then(res=>{
      wx.showToast({
        title: '更新成功',
        duration:2000,
        mask:true
      })
    })
  },

  // 储存图片至云端
  cloudFile(doctorProofName, doctorSelfPicName){
    wx.cloud.uploadFile({
      cloudPath:"index3/Certification/doctors/doctorSelfPic/"+doctorSelfPicName,
      filePath:this.data.doctorSelfPic
    }).then(res=>{})
  },

  // 获取医师信息
  getDoctor(doctorId){
    db.collection('doctors').doc(doctorId).get().then(res => {
      this.setData({
        certiName: res.data.name,
        school: res.data.school,
        level: res.data.level,
        spec: res.data.speciality,
        doctorProof: res.data.proof,
        doctorSelfPic: res.data.docSelfPic ? res.data.docSelfPic : "/icons/certi_add.png",
      })
    })
  },
})