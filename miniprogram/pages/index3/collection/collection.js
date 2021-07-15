// pages/index0/passage/passage.js
const db=wx.cloud.database()
const _ = db.command
let flag=true
let cnt = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passageList:[]     //文章详情列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    this.getData();
    wx.hideLoading();
  },

  getData(){
    var that = this
    // 获取个人的文章收藏数据
    db.collection("index0_passageCollect")
    .where({
        isCollected:true
    })
    .get().then(res=>{
      console.log(res.data)
      var passage_collections = []
      // 将个人收藏的文章id push入一个临时数组
      for(var i=0;i<res.data.length;i++){
        passage_collections.push(res.data[i].passage_id)
      }
      cnt = res.data.length
      // 利用 _.in 查询条件获取所有该用户收藏的文章
      db.collection("index0_passageLongPicture").orderBy('pushTime','desc').limit(8).where({
        _id: _.in(passage_collections)
      }).get().then(res=>{
        that.setData({
          passageList: res.data,
          passage_collections: passage_collections
        })
      })
    })
  },

  onReachBottom: function () {
    let oldData = this.data.passageList;
    let passage_collections = this.data.passage_collections;
    if(oldData.length<cnt){
      wx.showLoading({
        title: '加载中',
      })
      db.collection("index0_passageLongPicture").orderBy('pushTime', 'desc').skip(oldData.length).limit(8).where({
        _id: _.in(passage_collections)
      }).get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          passageList:newData
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
  },

})