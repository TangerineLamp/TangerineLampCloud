const db = wx.cloud.database();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certiName:"",//学生姓名
    school:"",//学生所在的学校
    openid:"",//学生的openid
    studentProof:"/icons/certi_add.png",
    stuSelfPic:"/icons/certi_add.png",
    isSubmit: false,//检测是否提交过
  },

  onLoad(){
    this.setData({
      openid: app.globalData.openid
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
          studentProof:res.tempFilePaths[0]
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

  // 获取照片
  chooseContent(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          stuSelfPic:res.tempFilePaths[0]
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
    else if (this.data.studentProof == "/icons/certi_add.png" 
    || this.data.stuSelfPic == "/icons/certi_add.png")
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
    let studentProofName = ""; //学生证书
    let stuSelfPicName = "";  //学生照片
    //判断介绍图片格式
    if(this.data.studentProof.endsWith(".jpg")){
      studentProofName = this.data.certiName + "_studentProof.jpg"
    }else if(this.data.studentProof.endsWith(".png")){
      studentProofName = this.data.certiName + "_studentProof.png"
    }else if(this.data.studentProof.endsWith(".svg")){
      studentProofName = this.data.certiName + "_studentProof.svg"
    }
    //判断文章长图格式
    if(this.data.stuSelfPic.endsWith(".jpg")){
      stuSelfPicName = this.data.certiName + "_stuSelfPic.jpg"
    }else if(this.data.stuSelfPic.endsWith(".png")){
      stuSelfPicName = this.data.certiName + "_stuSelfPic.png"
    }else if(this.data.stuSelfPic.endsWith(".svg")){
      stuSelfPicName = this.data.certiName + "_stuSelfPic.svg"
    }
    //图片上传至云储存
    this.cloudFile(studentProofName,stuSelfPicName);
    //信息上传至数据库
    db.collection("students")
    .add({
      data:{
        name:this.data.certiName,
        school:this.data.school,
        studentProof:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/Certification/students/studentProof/"+studentProofName,
        stuSelfPic:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/Certification/students/studentSelf/"+stuSelfPicName,
        isCertification: false,
        studentId: this.data.openid,
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
  cloudFile(studentProofName,stuSelfPicName){
    wx.cloud.uploadFile({
      cloudPath:"index3/Certification/students/studentProof/"+studentProofName,
      filePath:this.data.studentProof
    }).then(res=>{})
    wx.cloud.uploadFile({
      cloudPath:"index3/Certification/students/studentSelf/"+stuSelfPicName,
      filePath:this.data.stuSelfPic
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