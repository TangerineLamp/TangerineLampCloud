// pages/index0/comic/comic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    slides: [
      { url: 'http://p1.music.126.net/3iGnkiIwi5-Aa56TVg_Zww==/109951165678592787.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/H5DfakDPIQHoAKbQ5XC3Fg==/109951165679165117.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/n3VNGm9bW12JUkg1QEUy3A==/109951165679781345.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/qyGARhouAcu4s-IqKyXURw==/109951165679120218.jpg?imageView&quality=89' }
    ],
    item: 0,
    tab: 0,

    // 漫画列表
    comicList:[
      {
        id:0,
        title:"如果历史是一群喵",
        author:"肥志",
        des:"萌系/治愈/正能量",
        image:"https://i0.hdslb.com/bfs/manga-static/f9c8736e2c2dd08ac33be079613d2c9b6facfcf8.jpg@300w.jpg"
      },
      {
        id:1,
        title:"那年那兔那些事儿",
        author:"逆光飞行",
        des:"热血/正能量",
        image:"https://i0.hdslb.com/bfs/manga-static/e043e9cdab6061c2a4af001fadc15c93f92d2d12.jpg@300w.jpg"
      },
      {
        id:2,
        title:"名侦探柯南",
        author:"青山刚昌",
        des:"推理/悬疑/搞笑",
        image:"https://i0.hdslb.com/bfs/manga-static/32b6c26805e27403f11d563cada5f73b55fcbb91.jpg@300w.jpg"
      },
      {
        id:3,
        title:"非人哉",
        author:"一汪空气",
        des:"搞笑/日常/治愈",
        image:"https://i0.hdslb.com/bfs/manga-static/4fd60d7bfc298495170a004324c9bfcfc4d4c8af.jpg@300w.jpg"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})