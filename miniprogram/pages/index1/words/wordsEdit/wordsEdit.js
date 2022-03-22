const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigTitle:"",
    origin:"",
    content:[]
  },

  //添加小标题
  addTitle(){
    let newObj = {
      topic:"",
      paragraph:""
    }
    let newList = this.data.content;
    newList[newList.length] = newObj;
    this.setData({
      content:newList
    })
    //使页面滚动到容器底部
    this.pageScrollToBottom();
  },

  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect){
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.height
      })
    }).exec()
  },

  //获取并set词条大标题输入内容
  handleBigTitle(e){
    this.setData({
      bigTitle:e.detail.value
    })
  },

  //获取并set内容来源输入内容
  handleOrigin(e){
    this.setData({
      origin:e.detail.value
    })
  },

  //获取小标题
  handleSmallTitle(e){
    let index = e.target.dataset.index;
    let newList = this.data.content;
    newList[index].topic = e.detail.value;
    this.setData({
      content:newList
    })
  },

  //获取小标题对应内容
  handleContent(e){
    let index = e.target.dataset.index;
    let newList = this.data.content;
    newList[index].paragraph = e.detail.value;
    this.setData({
      content:newList
    })
  },

  //展示提交窗口
  showPopup() {
    var that = this;
    wx.showModal({
      title:"录入数据",
      content:"确定提交数据？",
      cancelColor: 'cancelColor',
      success(res){
        if(res.confirm){
          if(that.data.bigTitle && (that.data.content.length>0)){
            that.commit();
          }else{
            wx.showToast({
              title: '标题和详细内容不能为空',
              duration:2000,
              icon:'none',
            })
          }
        }else if(res.cancel){}
      }
    })
  },

  //提交数据至数据库
  commit(){
    let pushTime = new Date();
    db.collection("index1_wordsList").add({
      data:{
        title:this.data.bigTitle,
        content:this.data.content,
        pushTime:pushTime,
        origin:this.data.origin ? this.data.origin : '互联网',
      }
    })
    this.setData({
      bigTitle:"",
      origin:"",
      content:[]
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  }

})