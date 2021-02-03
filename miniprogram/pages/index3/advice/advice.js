// pages/index3/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */data: {
    items: ['异常闪退', '加载迟缓', '界面错位', '其他'],

    shopitem: '默认排序' //默认显示的

  },



  bindshop: function (event) {
    var classify = event.currentTarget.dataset.classify;

    var that = this;

    console.log(classify) //输出的结果就是你点击的

    this.setData({
      shopitem: classify, //更新

    })

  }
})