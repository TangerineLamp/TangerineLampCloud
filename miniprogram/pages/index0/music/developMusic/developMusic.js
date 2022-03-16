const db = wx.cloud.database();
let musicName = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    singer:"",
    src:"",
    coverImg:"/icons/none_img.png"
  },

  //获取并set词条大标题输入内容
  handleTitle(e){
    this.setData({
      title:e.detail.value
    })
  },

  //获取并set简介输入内容
  handleSinger(e){
    this.setData({
      singer:e.detail.value
    })
  },

  // 获取并set详情介绍输入音乐云仓库链接
  handleSrc(e){
    this.setData({
      src:e.detail.value
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
          coverImg:res.tempFilePaths[0]
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
    let coverImgName = ""; //介绍图片
    //判断介绍图片格式
    if(this.data.coverImg.endsWith(".jpg")){
      coverImgName = this.data.title + "_coverImg.jpg"
    }else if(this.data.coverImg.endsWith(".png")){
      coverImgName = this.data.title + "_coverImg.png"
    }else if(this.data.coverImg.endsWith(".svg")){
      coverImgName = this.data.title + "_coverImg.svg"
    }
    this.cloudFile(coverImgName);
    db.collection("index0_music").add({
      data:{
        title:this.data.title,
        singer:this.data.singer,
        src:this.data.src,
        // cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/music/coverImg/C大调奏鸣曲_coverImg.jpg
        coverImgUrl:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/music/coverImg/"+coverImgName,
        pushTime:pushTime
      }
    })
    this.setData({
      title:"",
      singer:"",
      coverImgUrl:"/icons/none_img.png",
      src:""
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  },

  // 储存封面图片至云端
  cloudFile(coverImgName){
    wx.cloud.uploadFile({
      cloudPath:"index0/music/coverImg/"+coverImgName,
      filePath:this.data.coverImg
    }).then(res=>{})
  }
})