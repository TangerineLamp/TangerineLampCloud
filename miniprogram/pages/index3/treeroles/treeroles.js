// pages/index3/treeroles/treeroles.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theHostOpenId: null,  // 在加载页面时从登录界面获取openid
    _: null,  //  垃圾
    isLogin: false, // 记录是否登录
  },

  onLoad: function (options) {
    this.setData({
      theHostOpenId:  app.globalData.openid,
      isLogin: app.globalData.isLogin
    })
    console.log("此时全局变量里面的openid为", app.globalData.openid)
    console.log('用户登录了吗？',this.data.isLogin)
  },

  onShow(){
    this.getTreeHoleData()
  },

  onHide(){
    this.getTreeHoleData()
  },

  /**
   * 获得数据库里面的树洞数据
   */
  getTreeHoleData(){
    console.log("检测该用户openid",this.data.theHostOpenId)
    db.collection("index2_treeholes")
    .where({
      _openid: this.data.theHostOpenId
    })
    .get()
    .then(res => {
      console.log("从数据库中根据openid返回的结果",res)
      this.setData({
        treeHoleData: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 处理删除树洞事件
   */
  deleteMe(res){
    console.log("用户选中树洞的id: ", res.currentTarget.dataset.thistreeholeid)
    let tempid = res.currentTarget.dataset.thistreeholeid
    const that = this
    // 提醒用户是否要删除树洞
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (e) {
        // 点击了确定以后会删除树洞和评论
        if (e.confirm) { 
          //  删除树洞
          console.log('用户点击确定')
          console.log('开始删除树洞信息')
          db.collection('index2_treeholes')
          .doc(tempid)
          .remove()
          //  删除评论
          console.log('成功删除树洞: ', tempid)
          console.log('开始删除树洞中的评论')
          db.collection('index2_comments')
          .where({
            treeholeid: tempid
          })
          .remove()
          // 删除点赞
          console.log('开始删除树洞的点赞')
          db.collection('index2_likeTag')
          .where({
            treeholeid: tempid
          })
          .remove()
          // 显示删除的提示界面
          that.getTreeHoleData()
          wx.showToast({
            title: '删除成功',
          })
        } 
      } 
    })
  },

  toDetail(res){
    let tempid = res.currentTarget.dataset.thistreeholeid
    let tempurl = "/pages/index2/detailPage/detailPage?title=" + tempid
    wx.navigateTo({
      url: tempurl,
    })
  },

  catchtouchmove(){}
})