const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    author:"",
    introImage:"/icons/none_img.png",
    body:"/icons/none_img.png"
  },

  //获取并set词条大标题输入内容
  handleTitle(e){
    this.setData({
      title:e.detail.value
    })
  },

  //获取并set简介输入内容
  handleAuthor(e){
    this.setData({
      author:e.detail.value
    })
  },

  // 获取封面
  chooseCover(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          introImage:res.tempFilePaths[0]
        })
      },
      fail(){
        wx.showToast({
          icon:"none",
          title: '上传失败',
        })
      }
    })
  },

  // 获取内容长图
  chooseContent(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          body:res.tempFilePaths[0]
        })
      },
      fail(){
        wx.showToast({
          icon:"none",
          title: '上传失败',
        })
      }
    })
  },

  // 展示提交窗口
  showPopup(){
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
  },

  //提交数据
  commit(){
    console.log("提交成功")
    let pushTime = new Date();
    let introImageName = ""; //介绍图片
    let passageLongPictureName = ""; //文章长图，仅支持上传一张
    //判断介绍图片格式
    if(this.data.introImage.endsWith(".jpg")){
      introImageName = this.data.title + "_introImage.jpg"
    }else if(this.data.introImage.endsWith(".png")){
      introImageName = this.data.title + "_introImage.png"
    }else if(this.data.introImage.endsWith(".svg")){
      introImageName = this.data.title + "_introImage.svg"
    }
    //判断文章长图格式
    if(this.data.body.endsWith(".jpg")){
      passageLongPictureName = this.data.title + "_passageBody.jpg"
    }else if(this.data.body.endsWith(".png")){
      passageLongPictureName = this.data.title + "_passageBody.png"
    }else if(this.data.body.endsWith(".svg")){
      passageLongPictureName = this.data.title + "_passageBody.svg"
    }
    this.cloudFile(introImageName,passageLongPictureName);
    db.collection("index0_passageLongPicture").add({
      data:{
        title:this.data.title,
        author:this.data.author,
        introImage:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/introImage/"+introImageName,
        body:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/body/"+passageLongPictureName,
        pushTime:pushTime
      }
    })
    this.setData({
      title:"",
      author:"",
      introduce_words:"",
      introImage:"/icons/none_img.png",
      body:"/icons/none_img.png"
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  },

  // 储存图片至云端
  cloudFile(introImageName,passageLongPictureName){
    wx.cloud.uploadFile({
      cloudPath:"index0/passage-longPicture/introImage/"+introImageName,
      filePath:this.data.introImage
    }).then(res=>{})
    wx.cloud.uploadFile({
      cloudPath:"index0/passage-longPicture/body/"+passageLongPictureName,
      filePath:this.data.body
    }).then(res=>{})
  }
})