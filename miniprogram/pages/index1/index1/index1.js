const db = wx.cloud.database();
const app = getApp();
var maxPaidTest;
var maxFreeTest;
//index1_paidTestList
//index1_freeTestList

Page({
  data: {
    currentIndex:0,
    scrollTop:0,
    // leftMenuList:["专业测评","娱乐测评"],
    leftMenuList:["专业测评"],
    rightTestList:[],
  },

  //首次加载页面时，调用onload
  onLoad: function(options){
    wx.showLoading({
      title: '加载中'
    })
    this.getCount();
    this.getIndex0();
    wx.hideLoading();
  },

  //获取最大记录条数
  getCount() {
    db.collection("index1_paidTestList").count().then(res=>{
      maxPaidTest = res.total
    })
    db.collection("index1_freeTestList").count().then(res=>{
      maxFreeTest = res.total
    })
  },

  //获取专业测评列表
  getIndex0(){
    db.collection("index1_paidTestList").orderBy('pushTime', 'desc').limit(8).get().then(res=>{
      this.setData({
        rightTestList:res.data,
        currentIndex:0,
        scrollTop:0
      })
    })
  },

  //获取娱乐测评列表
  getIndex1() {
    db.collection("index1_freeTestList").orderBy('pushTime', 'desc').limit(8).get().then(res=>{
      this.setData({
        rightTestList:res.data,
        currentIndex:1,
        scrollTop:0
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bottomRefresh: function () {
    let oldData = this.data.rightTestList;
    if(this.data.currentIndex==0){          //专业测评下拉加载，更新rightTestList并重新渲染
      if(oldData.length<maxPaidTest){
        wx.showLoading({
          title: '加载中',
        })
        db.collection("index1_paidTestList").orderBy('pushTime', 'desc').skip(oldData.length).limit(8).get().then(res=>{
          let newList = res.data;
          let newData = oldData.concat(newList);
          this.setData({
            rightTestList:newData
          })
        })
        wx.hideLoading();
      }else{
        wx.showToast({
          title: '到底了哦',
          icon: 'success',
          duration: 1000
        })
      }
    }else{                                 //娱乐测评下拉加载，更新rightTestList并重新渲染
      if(oldData.length<maxFreeTest){
        wx.showLoading({
          title: '加载中',
        })
        db.collection("index1_freeTestList").orderBy('pushTime', 'desc').skip(oldData.length).limit(8).get().then(res=>{
          let newList = res.data;
          let newData = oldData.concat(newList);
          this.setData({
            rightTestList:newData
          })
        })
        wx.hideLoading();
      }else{
        wx.showToast({
          title: '到底了哦',
          icon: 'success',
          duration: 1000
        })
      }
    }
  },
  
  //导航至词条检索
  bindViewTap1() {
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: "/pages/index1/words/wordsIndex/wordsIndex"
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
        duration: 1000
      })
    }
  },
  //导航至心理咨询
  bindViewTap2() {
    wx.navigateTo({
      url: "/pages/index1/advice/adviceIndex/adviceiIndex"
    })
  },
  //导航至心理课程
  bindViewTap3() {
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: "/pages/index1/course/courseIndex/courseIndex"
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
        duration: 1000
      })
    }
  },

  //左侧菜单点击事件,重新渲染右侧列表
  switchRightTab(e){
    const {index}=e.currentTarget.dataset;
    wx.showLoading({
      title: '加载中',
    })
    if(index===0){
      this.getIndex0();
    }else{
      this.getIndex1();
    }
    wx.hideLoading();
  },

  //心理测评导航点击事件
  navToTap(e){
    let tempid = e.currentTarget.dataset.id;
    if (app.globalData.isLogin){
      if(this.data.currentIndex==0){
        wx.navigateTo({
          url: '/pages/index1/test1/paidTestDetail/paidTestDetail?_id='+tempid,
        })
      }else if(this.data.currentIndex==1){
        wx.navigateTo({
          url: '/pages/index1/test1/freeTestDetail/freeTestDetail?_id='+tempid,
        })
      }
    }
    // 如果没有登录则提醒先登录
    else {
      wx.switchTab({
        url: '/pages/index3/index3',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  }


})  