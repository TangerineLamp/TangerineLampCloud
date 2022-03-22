// miniprogram/pages/index3/adjustAdviceTime_open/docList/docList.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
var maxCount = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    docList: [], // 医生列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDocList();
    this.getMaxCount();
  },

  getDocList(){
    db.collection("doctors")
    .where({
      isCertification:true
    })
    .orderBy('school', 'asc')
    .limit(15)
    .get()
    .then(res=>{
      console.log("res",res.data)
      this.setData({
        docList:res.data
      })
    })
  },

  //获取医师数量
  getMaxCount(){
    db.collection('doctors')
    .where({
      isCertification:true
    })
    .count()
    .then(res => {
      maxCount = res.total
    })
  },

    /**
   * 只要触底就进行更新
   * 直至将collection中的评论条目更新完
   */
  onReachBottom: function(){
    let oldData = this.data.docList;
    console.log(oldData)
    // 如果现在问题的数量小于问题总数量就下拉更新
    if(oldData.length < maxCount){
      // 显示加载条
      wx.showToast({
        icon: 'loading',
        duration: 500
      })
      // 开始更新下拉的数据
      // 树洞主人看到所有评论
        db.collection("doctors")
        .where({
          isCertification:true
        })
        .orderBy('school', 'asc')
        .skip(oldData.length)
        .limit(10)
        .get()
        .then(res=>{
          // 将新条目进行缝合
          let newList = res.data
          let newData = oldData.concat(newList)
          // 缝合好的新老数据传给data中条目列表
          this.setData({
            docList: newData
          })
        })
    }
    // 如果现在问题的数量等于问题总数量就显示‘加载完毕’
    else{
      this.setData({
        isShowSubmit: true
      })
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 1000
      })
    }
  },

})