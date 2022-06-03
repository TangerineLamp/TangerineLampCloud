const db = wx.cloud.database();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    certiName:"", //  医师姓名
    openid:"",  //  医师所在的学校
  },

  showPopup(){
    // 防止用户捣乱不写
    if (this.data.certiName == ""){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1500
      })
    }
    else if (this.data.openid == ""){
      wx.showToast({
        title: '请填写openID',
        icon: 'none',
        duration: 1500
      })
    }
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

  commit(){
    //信息上传至数据库
    db.collection("doctors").add({
      data:{
        _openid: this.data.openid,
        level: "",
        name: this.data.certiName,
        school: "",
        speciality: "",
        docSelfPic: "",
        isCertification: false,
        proof: ""
      }
    }).then(res=>{
      wx.showToast({
        title: '更新成功',
        duration:2000,
        mask:true
      })
      this.setData({
        certiName: "",
        openid: ""
      })
    })
  },

  handleName(e){
    this.setData({
      certiName:e.detail.value
    })
  },

  handleOpenid(e){
    this.setData({
      openid:e.detail.value
    })
  },
})