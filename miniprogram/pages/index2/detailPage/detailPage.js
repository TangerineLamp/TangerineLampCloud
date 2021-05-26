const db = wx.cloud.database()
const app = getApp()

Page({
  data: {
    headImg: "", // 头像
    likeCount: 0, // 喜欢的数量
    hostNickname: "", // 树洞主人昵称
    hostPostTime: "", //  树洞主人发布时间
    aritleDetail: "", //  树洞详细内容
    isAnonymous: true, //  匿名
    time: 0,  //  发布时间
    treeholeid: null, //  树洞id
    isHost: false, //  是否是树洞的主人
    visiterOpenid: null,  //  访问者的openid
    comments: [], //  评论区
    isLogin: false, //  是否登录
    commentDetails: "", //  临时的存放textArea的变量
  },

  /**
   * 从上一个内容中获取对应的id
   * @param {*} options 里面携带了对应的树洞id
   */
  onLoad(options){
    this.setData({
      treeholeid: options.title, //  获取对应的树洞的id
      visiterOpenid: app.globalData.openid, //  获取游客的openid
      isLogin: app.globalData.isLogin,  //  获取登录状态
    })
  },

  onShow(){
    this.getTreeholeData()
  },

  /**
   * 获取树洞的内容和评论
   */
  getTreeholeData(){
    db.collection("index2_treeholes")
    .doc(this.data.treeholeid)
    .get()
    .then(res=>{
      console.log("树洞的详细内容:",res.data)
      let judgeTemp = (res.data._openid == this.data.visiterOpenid)
      this.setData({
        headImg: res.data.avatar,
        likeCount: res.data.goodCount,
        hostNickname: res.data.nickName,
        hostPostTime: res.data.time,
        aritleDetail: res.data.mainBody,
        isAnonymous: res.data.isAnonymous,
        time: res.data.time,
        isHost: judgeTemp,
      })
      console.log("它是主人吗",this.data.isHost)
    })
    .then(res=>{  //  在获取树洞结束后获取评论用.then实现顺序执行
      this.getComments()  //  获取评论
    })
  },

  /**
   * 获取评论内容
   */
  getComments(){
    console.log('是否登录',this.data.isLogin)
    console.log('游客openid',this.data.visiterOpenid)
    console.log('树洞id',this.data.treeholeid)
    console.log('ta是主人吗',this.data.isHost)
    // 如果是树洞主人访问自己的树洞
    // 可以看到所有的回复内容
    if (this.data.isLogin && this.data.isHost){
      db.collection("index2_comments")
      .where({
        treeholeid: this.data.treeholeid
      })
      .get()
      .then(res=>{
        console.log("主人访问,评论详细内容", res.data)
        this.setData({
          comments: res.data
        })
      })
    }
    // 如果是游客访问别人的树洞
    // 则只能看到自己的回复内容
    else if (this.data.isLogin && (!this.data.isHost)){
      db.collection("index2_comments")
      .where({
        treeholeid: this.data.treeholeid,
        _openid: this.data.visiterOpenid
      })
      .get()
      .then(res=>{
        console.log("别人访问,评论详细内容", res.data)
        this.setData({
          comments: res.data
        })
      })
    }
  },

  /**
   * 在textArea中写入后会将内容传到暂存的数据commentDetails里去
   */
  bindTextAreaInput: function(e) {
    this.setData({
      commentDetails: e.detail.value,
    });
  },

  /**
   * 发送回复
   */
  send(e){
    // 如果未登录，则提醒登录
    if (!this.data.isLogin){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }
    // 如果登录了,则可以写评论
    else{
      // 评论不可以为空
      if (this.data.commentDetails.length == 0) {
        wx.showToast({
          title: '评论不能为空呢',
          image: "/pages/index2/logo/failForVoidTreehole.png",// 这个是提示文件的本地路径
          duration: 2000//持续的时间
        })
      }
      else{
        // 显示正在发送
        wx.showLoading({
          title: '发布中...',
        });
        // 正式开始发送
        let dateTemp = new Date().getTime()
        db.collection("index2_comments")
        .add({
          data: {
            treeholeid: this.data.treeholeid,
            comment: this.data.commentDetails,
            time: dateTemp,
            commenterNickname: app.globalData.userInfo.nickName,
            commenterAvatar: app.globalData.userInfo.avatarUrl,
          }
        })
        .then(res=>{
          // 成功存储后撤回内容,让用户重新进入这个树洞
          this.setData({
            commentDetails: ""
          })
          const that = this
          setTimeout(function (){
            wx.hideLoading()
            that.getComments()
          }, 2000)
        })
      }
    }
  },

  /**
   * 前往个人页面
   */
  toLogin(){
    wx.switchTab({
      url: "/pages/index3/index3",
    })
  },

    /**
   * 处理删除评论事件
   */
  deleteMe(res){
    console.log("用户选中评论的id: ", res.currentTarget.dataset.thistreeholeid)
    let tempid = res.currentTarget.dataset.thistreeholeid
    const that = this
    // 提醒用户是否要删除树洞
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (e) {
        // 点击了确定以后会删除树洞和评论
        if (e.confirm) { 
          //  删除评论
          db.collection('index2_comments')
          .doc(tempid)
          .remove()
          // 显示删除的提示界面
          that.getComments()
          wx.showToast({
            title: '删除成功',
          })
        } 
      } 
    })
  },
})