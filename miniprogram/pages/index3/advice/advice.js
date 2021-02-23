const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */data: {
    items: ['异常闪退', '加载迟缓', '界面错位', '其他'],

    shopitem: '默认排序',//默认显示的

    content: ""

  },



  bindshop: function (event) {
    var classify = event.currentTarget.dataset.classify;
    console.log(classify) //输出的结果就是你点击的
    this.setData({
      shopitem: classify, //更新

    })

  },
  go_back_index3() {
    wx.navigateBack({
      delta: 1
    });

  },
  btnSub(res) {
    var content = res.detail.value.content;
    db.collection("index3_feedback").add({
      data: {
        content: content,
        shopitem: this.data.shopitem


      }
    }).then(res => {
      console.log(res)
    })

    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    })
    // this.go_back_index3();


  }
})