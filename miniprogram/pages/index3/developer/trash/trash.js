const db = wx.cloud.database();

Page({
  data: {

  },

  onLoad: function (options) {

  },

  deletePassageCollection(){
    wx.showToast({
      title: '成功清除',
      duration: 1000
    })
    wx.cloud.callFunction({
      name: 'collectTrash',
      data: {

      }
    }).then(res=>{
      console.log("文章收藏垃圾数据成功清除，数量：",res.result.stats.removed)
    })
  }

})