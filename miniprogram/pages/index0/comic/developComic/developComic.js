// miniprogram/pages/index0/comic/developComic/developComic.js
const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    author:"",
    des:"",
    image:"/icons/none_img.png", //介绍缩略图
    content:"/icons/none_img.png" //漫画长图
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

  // 获取并set详情介绍输入内容
  handleDes(e){
    this.setData({
      des:e.detail.value
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
          image:res.tempFilePaths[0]
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

  // 获取内容
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
    let imageName = ""; //介绍图片
    let contentName = ""; //内容长图
    //判断介绍图片格式
    if(this.data.image.endsWith(".jpg")){
      imageName = this.data.title + "_image.jpg"
    }else if(this.data.image.endsWith(".png")){
      imageName = this.data.title + "_image.png"
    }else if(this.data.image.endsWith(".svg")){
      imageName = this.data.title + "_image.svg"
    }
    //判断内容长图格式
    if(this.data.content.endsWith(".jpg")){
      contentName = this.data.title + "_contentPicture.jpg"
    }else if(this.data.content.endsWith(".png")){
      contentName = this.data.title + "_contentPicture.png"
    }else if(this.data.content.endsWith(".svg")){
      contentName = this.data.title + "_contentPicture.svg"
    }
    
    this.cloudFile(imageName,contentName);
    db.collection("index0_comic").add({
      data:{
        title:this.data.title,
        author:this.data.author,
        des:this.data.des,
        image:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/comic/coverImage/"+imageName,
        content: new Array("cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/comic/comicContent/"+contentName),
        pushTime:pushTime
      }
    })
    this.setData({
      title:"",
      author:"",
      des:"",
      image:"/icons/none_img.png",
      content:"/icons/none_img.png"
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  },

  // 储存图片至云端
  cloudFile(imageName,contentName){
    wx.cloud.uploadFile({
      cloudPath:"index0/comic/coverImage/"+imageName,
      filePath:this.data.image
    }).then(res=>{})
    wx.cloud.uploadFile({
      cloudPath:"index0/comic/comicContent/"+contentName,
      filePath:this.data.content
    }).then(res=>{})
  }
})