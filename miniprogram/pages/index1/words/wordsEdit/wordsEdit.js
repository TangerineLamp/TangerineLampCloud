const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigTitle:"",
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
  },

  //获取并set词条大标题输入内容
  handleBigTitle(e){
    this.setData({
      bigTitle:e.detail.value
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
          that.commit1();
        }else if(res.cancel){}
      }
    })
  },

  //提交数据至数据库
  commit1(){
    let pushTime = new Date();
    db.collection("index1_wordsList").add({
      data:{
        title:this.data.bigTitle,
        content:this.data.content,
        pushTime:pushTime
      }
    })
    this.setData({
      bigTitle:"",
      content:[]
    })
    wx.showToast({
      title: '提交成功',
      duration:1500,
      mask:true
    })
  }

})