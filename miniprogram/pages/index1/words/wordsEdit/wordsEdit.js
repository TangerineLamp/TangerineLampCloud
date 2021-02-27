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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onReady: function(){
    // 获取popup组件
    this.popup = this.selectComponent("#popup");
  },

  //获取并set词条大标题输入内容
  handleBigTitle(e){
    this.setData({
      bigTitle:e.detail.value
    })
  },

  //展示提交窗口
  showPopup() {
    this.popup.showPopup();
  },
 
  //取消事件
  _error() {
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    this.commit();
    this.popup.hidePopup();
  },

  //提交数据至数据库
  commit(){
    console.log("提交数据")
  }

})