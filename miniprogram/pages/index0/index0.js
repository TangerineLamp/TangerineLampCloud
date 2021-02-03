// pages/index0/index0.js
const app = getApp()

Page({
  data: {
    passageIconSrc: '/icons/passage-icon.jpg',
    musicIconSrc: '/icons/music-icon.jpg',
    comicIconSrc: '/icons/comic-icon.jpg',
    radioIconSrc: '/icons/radio-icon.jpg',
    contactIconSrc: '/icons/contact-icon.jpg'
  },
 
  onLoad: function() {
    var that = this
    var picList = []
    picList.push("http://huxi.cqu.edu.cn/static/upfiles/202101/20210105145014986.jpg")
    picList.push("http://huxi.cqu.edu.cn/static/upfiles/202012/20201223153007606.jpg")
    picList.push("http://huxi.cqu.edu.cn/static/upfiles/202101/20210105144631101.jpg")
    that.setData({
      picList: picList,
    })
  }
})
