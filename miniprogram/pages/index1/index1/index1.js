const db = wx.cloud.database();
//index1_paidTestList
//index1_freeTestList

Page({
  data: {
    currentIndex:0,
    scrollTop:0,
    leftMenuList:["专业测评","娱乐测评"],
    rightTestList:[],
  },

  //首次加载页面时，调用onload
  onLoad: function(options){
    wx.showLoading({
      title: '加载中'
    })
    this.getIndex0();
    wx.hideLoading();
  },

  //获取专业测评列表
  getIndex0(){
    db.collection("index1_paidTestList").limit(8).get().then(res=>{
      this.setData({
        rightTestList:res.data,
        currentIndex:0
      })
    })
  },

  //获取娱乐测评列表
  getIndex1() {
    db.collection("index1_freeTestList").limit(8).get().then(res=>{
      this.setData({
        rightTestList:res.data,
        currentIndex:1
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bottomRefresh: function () {
    // let oldData = this.data.rightTestList;
    // let newList = [];
    // if(this.data.currentIndex==0){
    //   newList = this.newListPaid;
    // }else{
    //   newList = this.newListFree;
    // }
    // let newData = oldData.concat(newList);
    // this.setData({
    //   rightTestList:newData
    // })
    console.log("触底");
  },
  
  //导航至词条检索
  bindViewTap1() {
    wx.navigateTo({
      url: "/pages/index1/words/wordsIndex/wordsIndex"
    })
  },
  //导航至心理咨询
  bindViewTap2() {
    // wx.navigateTo({
    //   url: "/pages/index1/advice/adviceIndex/adviceiIndex"
    // })  
    wx.showToast({
      title: '敬请期待', //弹框内容
      icon: 'success',  //弹框模式
      duration: 1000    //弹框显示时间
    })
  },
  //导航至心理课程
  bindViewTap3() {
    wx.navigateTo({
      url: "/pages/index1/course/courseIndex/courseIndex"
    })
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


})  