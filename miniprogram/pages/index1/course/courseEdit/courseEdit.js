const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigTitle:"",
    des:"",
    introduce_words:"",
    cover:"/icons/none_img.png",
    content:"/icons/none_img.png"
  },

  //获取并set词条大标题输入内容
  handleBigTitle(e){
    this.setData({
      bigTitle:e.detail.value
    })
  },

  //获取并set简介输入内容
  handleDes(e){
    this.setData({
      des:e.detail.value
    })
  },

  // 获取并set详情介绍输入内容
  handleIntroduce(e){
    this.setData({
      introduce_words:e.detail.value
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
          cover:res.tempFilePaths[0]
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
          content:res.tempFilePaths[0]
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
    let coverName = "";
    let contentName = "";
    //判断封面格式
    if(this.data.cover.endsWith(".jpg")){
      coverName = this.data.bigTitle + "_cover.jpg"
    }else if(this.data.cover.endsWith(".png")){
      coverName = this.data.bigTitle + "_cover.png"
    }else if(this.data.cover.endsWith(".svg")){
      coverName = this.data.bigTitle + "_cover.svg"
    }
    //判断内容格式
    if(this.data.content.endsWith(".jpg")){
      contentName = this.data.bigTitle + "_content.jpg"
    }else if(this.data.content.endsWith(".png")){
      contentName = this.data.bigTitle + "_content.png"
    }else if(this.data.content.endsWith(".svg")){
      contentName = this.data.bigTitle + "_content.svg"
    }
    this.cloudFile(coverName,contentName);
    db.collection("index1_courseList").add({
      data:{
        title:this.data.bigTitle,
        des:this.data.des,
        introduce_words:this.data.introduce_words,
        cover:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index1/course/cover/"+coverName,
        content:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index1/course/content/"+contentName,
        pushTime:pushTime
      }
    })
    this.setData({
      bigTitle:"",
      des:"",
      introduce_words:"",
      cover:"/icons/none_img.png",
      content:"/icons/none_img.png"
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  },

  // 储存图片至云端
  cloudFile(coverName,contentName){
    wx.cloud.uploadFile({
      cloudPath:"index1/course/cover/"+coverName,
      filePath:this.data.cover
    }).then(res=>{})
    wx.cloud.uploadFile({
      cloudPath:"index1/course/content/"+contentName,
      filePath:this.data.content
    }).then(res=>{})
  }
})