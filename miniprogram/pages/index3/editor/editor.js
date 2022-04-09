// pages/index3/editor/editor.js
const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickName:"",
      sentence:["把快乐放进重点反复背诵。",
      "可遇，可望，可期。",
      "随心、随缘、随喜。",
      "阅己，悦己，越己。",
      "自静，自醒，自清欢。",
      "不将就自己，不敷衍生活。",
      "清醒，知趣，明得失，知进退。",
      "永怀善意，清澈明朗，从始如一。",
      "万事，尽心尽力，而后，顺其自然。",
      "热爱漫无边际，生活自有分寸。",
      "各自乘流而上，互为欢喜人间。",
      "做一阵风吧，有温柔也有英勇。",
      "总觉得我应该成为更好的自己。",
      "每个灵魂里都有一朵玫瑰。",
      "在心里种花，人生才不会荒芜。",
      "人生，就是一场花时间爱自己的旅行。",
      "四季周而复始的更替，来年还是春风绕枝头。",
      "将昨日事，归欢喜处。",
      "睡前旧事归于尽，醒来依旧迎花开。",
      "一身温柔，满怀暖意，静度一生。"
    ],
    rand:"",
    surpriseList:['看似鸡零狗碎的生活碎片，却是通向快乐星球的秘密隧道。',
    '你来人间一趟，你要看看太阳，和你的心上人，一起走在街上。',
    '你现在要做的是：多读书，按时睡，然后变得温柔，大度，继续善良，保持可爱。',
    '请成为永远疯狂永远浪漫永远清澈的存在。',
    '无论多大，你都要热爱童话，英雄和魔法。',
    '认真生活就能找到生活藏起来的糖果。',
    '你可以讨厌一个东西，但请允许它存在，也请允许别人喜欢它。',
    '并不可否认，生活磨掉了我们一部分的勇气和温柔。但我也相信，因为我们还很年轻，所以失去的还会长出来，而新的部分将闪闪发光。',
    '在大家都期待超级英雄的降临时，是一个又一个的普通人把自己的所能拼凑起来，然后才有了划破黑夜的光亮。',
    '这个世界乱糟糟的，而你干干净净，可以悬在我的心上，作太阳和月亮。',
    '无论何人无论何时，人们总要在乌云周围寻索着浪漫的微光活下去。',
    '因为有愿望，生命的进程既不是偶然，也非必然。',
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let userInfo=wx.getStorageSync('userInfo');
      // console.log(userInfo)
      this.setData({
        nickName:userInfo.nickName

      })
      let index=Math.floor(Math.random()*this.data.sentence.length);
      // console.log(index);
      this.setData({
        rand:this.data.sentence[index]
      })
  },
  cdUpdate(){
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: '/pages/index3/editor/update/update',
      })
    }
    // 否则提示要登录
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }
  },
  surprise(){
    let k = Math.floor(Math.random()*this.data.surpriseList.length);
    wx.showToast({
      title: this.data.surpriseList[k],
      icon: 'none',
      image: '',
      duration: 5000,
      mask: false,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  version(){
    wx.showToast({
      title: '后续版本，正在路上',
      icon: 'none',
      image: '',
      duration: 2500,
      mask: true,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  clear(){
    wx.showModal({
      title:"提示",
      content:"确定清空缓存？",
      cancelColor: 'cancelColor',
      success(res){
        if(res.confirm){
          wx.clearStorageSync();
          wx.showToast({
            title: '您已成功清除缓存',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result)=>{
              console.log("Clearing is successful")
            },
            fail: ()=>{},
            complete: ()=>{}
          });
          let testUserInfo=wx.getStorage({
            key: 'userInfo',
            success: (result)=>{
              
            },
            fail: ()=>{},
            complete: ()=>{}
          });
          console.log(testUserInfo)
          app.globalData.isLogin=false
          app.globalData.hasUserInfo=false
          // wx.switchTab({
          //   url: '/pages/index3/index3',
          //   success: (result) => {
          //     console.log("清除缓存后返回tab")
          //   },
          //   fail: () => {},
          //   complete: () => {}
          // });
          wx.reLaunch({
            url: '/pages/index3/index3',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
        }else if(res.cancel){}
      }
    })
 
  },

  modifyName(){
    wx.showToast({
      title: '修改功能正在路上...',
      duration:2000,
      icon:'none',
    })
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