const app = getApp()
const db = wx.cloud.database()
var maxCount = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeholeJson: "",
    treeHoleData: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let josnTemp = options.title + ""
    this.setData({
      treeholeJson: app.globalData.treehole[josnTemp]
    })
    console.log(this.data.treeholeJson)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTreeHoleData()
    console.log(this.data.treeholeJson.color)
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.data.treeholeJson.color,
    })
    this.getMaxCount()
  },

  /**
   * 只要触底就进行更新
   * 直至将collection中的树洞条目更新完
   */
  onReachBottom: function(){
    let oldData = this.data.treeHoleData;
    // 如果现在问题的数量小于问题总数量就下拉更新
    if(oldData.length < maxCount){
      // 显示加载条
      wx.showToast({
        icon: 'loading',
        duration: 500
      })
      // 开始更新下拉的数据
      db.collection("index2_treeholes")
      .where({
        tag: this.data.treeholeJson.type
      })
      .orderBy('time', 'desc')
      .skip(oldData.length)
      .limit(10)
      .get()
      .then(res=>{
        // 将新问题进行缝合
        let newList = res.data
        let newData = oldData.concat(newList)
        // 缝合好的新老数据传给data中问题列表
        this.setData({
          treeHoleData: newData
        }).catch(err => {
          console.log('获得树洞数据失败 ',err)
          this.showError('网络连接失败')
        })
      })
    }
    // 如果现在问题的数量等于问题总数量就显示‘加载完毕’
    else{
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 500
      })
    }
  },

  /**
   * 跳转到树洞编辑页面
   */
  gotoPersonalEditor: function() {
    // 提示如果已经登录了就可以发树洞
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: "/pages/index2/editPage/personalEditor"
      })
    }
    // 如果没有登录则提醒先登录
    else {
      wx.switchTab({
        url: '/pages/index3/index3',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })  
    }
  },

  /**
   * 获得数据库里面的树洞数据
   */
  getTreeHoleData: async function(){
    let that = this
    await wx.cloud.callFunction({
      name: "index2_getTreeholeList",
      data: {
        dbName: "index2_treeholes",
        limCount: 10,
        theValue: this.data.treeholeJson.type,
        order: "time",
        length: 0
      },
      success: function(res){
        console.log(res),
        that.setData({
          treeHoleData: res.result.data
        })
      },
      fail: function(err){
        console.log('获得树洞数据失败 ',err)
        that.showError('网络连接失败')
      }
    })
    // db.collection("index2_treeholes")
    // .where({
    //   tag: this.data.treeholeJson.type
    // })
    // .limit(10)
    // .orderBy('time', 'desc')
    // .get()
    // .then(res => {
    //   this.setData({
    //     treeHoleData: res.data
    //   })
    //   this.data.treeHoleData["isCerti"] = this.getIsTrue(this.data.treeHoleData._openid)
    // }).catch(err => {
    //   console.log('获得树洞数据失败 ',err)
    //   this.showError('网络连接失败')
    // })
  },

  /**
   * 获得这一类型树洞的数目
   */
  getMaxCount(){
    db.collection('index2_treeholes')
    .where({
      tag: this.data.treeholeJson.type
    })
    .count()
    .then(res => {
      maxCount = res.total
    })
  },

  /**
   * 携带树洞信息id跳转到详细数据界面里面
   */
  toDetailPage(res){
    let tempid = res.currentTarget.dataset.treeholeid
    let tempurl = "/pages/index2/detailPage/detailPage?title=" + tempid
    wx.navigateTo({
      url: tempurl,
    })
  },

  showError(detail){
    wx.showToast({
      title: detail,
      icon: 'error',
      duration: 2000
    })
  },

  getIsTrue(openid){
    let tempIsCertification = false
    db.collection('doctors')
    .where({
      _openid: openid
    })
    .get()
    .then(res => {
      tempIsCertification = res.data.isCertification
      console.log(tempIsCertification)
      return tempIsCertification
    })
  },
})