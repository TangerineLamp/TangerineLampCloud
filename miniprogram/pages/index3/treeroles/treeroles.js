// pages/index3/treeroles/treeroles.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theHostOpenId: null,  // 在加载页面时从登录界面获取openid
    tempid: "", // 临时用来储存要删除的id
    _: null,  //  垃圾
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      theHostOpenId:  app.globalData.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.getTreeHoleData()
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获得数据库里面的树洞数据
   */
  getTreeHoleData(){
    db.collection("index2_treeholes")
    .where({
      _openid: this.data.theHostOpenId
    })
    .get()
    .then(res => {
      // console.log(res)
      this.setData({
        treeHoleData: res.data
      })
      // 获取正确的时间格式
      var thd = [] // 暂时储存时间的列表
      for (var i=0;i<res.data.length;i++){
        // 处理时间使其按照我们的标准显示
        var year = res.data[i].time.getFullYear()
        var month = res.data[i].time.getMonth() + 1
        var day = res.data[i].time.getDate()
        var hour = res.data[i].time.getHours()
        var minu = res.data[i].time.getMinutes()
        var second = res.data[i].time.getSeconds()
        var temp ='上传时间：'+year+'-'+month+'-'+day+" "+hour+":"+minu+":"+second
        thd.push(temp)
      }
        this.setData({
        treeHoleDate: thd
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 处理删除树洞事件
   */
  deleteMe(res){
    console.log("用户选中树洞名: ", res.currentTarget.dataset.thistreeholeid);
    this.setData({
      tempid : res.currentTarget.dataset.thistreeholeid,
    });
    const that = this;
    // 提醒用户是否要删除树洞
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (e) {
        // 点击了确定以后会删除树洞
        if (e.confirm) { 
          console.log('用户点击确定')
          db.collection('index2_treeholes')
          .doc(that.data.tempid)
          .remove()
          console.log('成功删除树洞: ', that.data.tempid)
          // 显示删除的提示界面
          that.getTreeHoleData()
          wx.showToast({
            title: '删除成功',
          })
        } // ene if(e.confirm)
      } // end function success
    }) // end wx.showModal
  }
})