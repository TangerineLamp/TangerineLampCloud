const db = wx.cloud.database()
const app = getApp()
const _ = db.command;
var maxCount = 0

Page({
  data: {
    comments: [], //  评论区
    commentDetails: "", //  临时的存放textArea的变量
    color: null,  //  样式
    theOpenid: null,  // 用户的openid
  },

  /**
   * 从上一个内容中获取对应的id
   * @param {*} options 里面携带了对应的树洞id
   */
  onLoad(options){
    this.setData({
      theOpenid: app.globalData.openid, //  获取游客的openid
    })
    this.updateRead()
  },

  onShow(){
    this.getComments()
    this.getMaxCount()
  },

  /**
   * 获取评论内容
   * 用户可以看到所有的评论内容
   */
  getComments(){
    console.log('openid', this.data.theOpenid)
    db.collection("index2_comments")
    .where(_.and([
      {
        _openid: _.not(_.eq(this.data.theOpenid))
      },
      {
        toID: this.data.theOpenid
      }
    ]))
    .orderBy('time', 'desc')
    .limit(10)
    .get()
    .then(res=>{
      console.log('获得的评论：', res)
      this.setData({
        comments: res.data
      })
    })
  },

  /**
   * 获得评论的数量
   */
  getMaxCount(){
    // 树洞主人获得所有的评论量
    db.collection('index2_comments')
    .where({
      toID: this.data.theOpenid
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
    let oldData = this.data.comments;
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
        db.collection("index2_comments")
        .where({
          toID: this.data.theOpenid
        })
        .orderBy('time', 'desc')
        .skip(oldData.length)
        .limit(10)
        .get()
        .then(res=>{
          // 将新条目进行缝合
          let newList = res.data
          let newData = oldData.concat(newList)
          // 缝合好的新老数据传给data中条目列表
          this.setData({
            comments: newData
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

  /**
   * 前往details页面的函数
   */
  toDetail(res){
    console.log("_treeholeid:",res.currentTarget.dataset.thistreeholeid)
    let tempid = res.currentTarget.dataset.thistreeholeid
    let tempurl = "/pages/index2/detailPage/detailPage?title=" + tempid
    wx.navigateTo({
      url: tempurl,
    })
  },

  // 将未读变为已读
  updateRead(){
    db.collection('index2_comments').where(_.and([
      {
        _openid: _.not(_.eq(this.data.theOpenid))
      },
      {
        toID: this.data.theOpenid
      }
    ])).update({
      data: {
        isRead: true,
      }
    })
  }
})