const db = wx.cloud.database()
const app = getApp()
var maxCount = 0
var toID = ''

Page({
  data: {
    treeholeid: null,       //  树洞id
    headImg: "",            //  树洞主人头像
    hostNickname: "",       //  树洞主人昵称
    hostPostTime: "",       //  树洞主人发布时间
    aritleDetail: "",       //  树洞详细内容
    time: 0,                //  树洞发布时间
    likeCount: 0,           //  该树洞被喜欢的数量
    isAnonymous: false ,    //  树洞主人是否匿名，默认不匿

    visiterOpenid: null,    //  游客的openid
    visitorName: "",        //  游客昵称
    visitorAvatar: "",      //  游客头像路径
    isCertification: false, //  游客是否是认证医师

    isLogin: false,         //  是否登录
    isHost: false,          //  是否是树洞的主人
    isDeveloper: false,     //  开发者选项

    comments: [],           //  评论区

    commentDetails: "",     //  临时的存放textArea的变量
    
    likecountTemp: 0,       //  返回时临时使用的点赞数
    likeIcon: null,         //  存放喜欢和不喜欢的图标地址
    color: null,            //  点赞的样式
    isLike: null,           //  用户是否喜欢这个树洞
    likeTagid: "无",        //  消息的引用
    oriLike: false,         //  用户以前喜欢吗
    countState_1: 0,        //  直接将点赞数量当做状态存起来,已点赞状态
    countState_2: 0,        //  未点赞状态
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
      isDeveloper: app.globalData.isDeveloper, // 获取开发者权限
    })
  },

  onShow(){
    this.getTreeholeData()
    this.getMaxCount()
    this.getInfo()
  },

  /**
   * 获取树洞的内容和评论
   */
  getTreeholeData(){
    var that = this
    db.collection("index2_treeholes").doc(that.data.treeholeid).get()
    .then(res=>{
      console.log("树洞的详细内容:",res.data)
      let judgeTemp = (res.data._openid == this.data.visiterOpenid)
      toID = res.data._openid
      this.setData({
        headImg: res.data.avatar,
        likeCount: res.data.goodCount,
        hostNickname: res.data.nickName,
        hostPostTime: res.data.time,
        aritleDetail: res.data.mainHtml,
        isAnonymous: res.data.isAnonymous,
        time: res.data.time,
        isHost: judgeTemp,
      })
      console.log("访问者是否是树洞主人",this.data.isHost)
    })
    .then(res=>{  //  在获取树洞结束后获取评论用.then实现顺序执行
      this.getComments()  //  获取评论
    })
    .then(res=>{
      this.getLikeTag()
    })
  },

  /**
   * 获取评论内容
   */
  getComments(){
    // 如果是树洞主人访问自己的树洞
    // 可以看到所有的回复内容
    if (this.data.isLogin && (this.data.isHost || this.data.isDeveloper)){
      db.collection("index2_comments").where({
        fromID: this.data.treeholeid
      }).orderBy('time', 'desc').limit(10).get()
      .then(res=>{
        console.log("主人访问,评论详细内容", res.data)
        this.setData({
          comments: res.data
        })
      })
    }
    // 如果是游客访问别人的树洞
    // 则只能看到自己的回复内容
    else if (this.data.isLogin && (!this.data.isHost && !this.data.isDeveloper)){
      db.collection("index2_comments").where({
        fromID: this.data.treeholeid,
        _openid: this.data.visiterOpenid
      }).orderBy('time','desc').limit(10).get()
      .then(res=>{
        console.log("别人访问,评论详细内容", res.data)
        this.setData({
          comments: res.data
        })
      })
    }
  },

  /**
   * 获得评论的数量
   */
  getMaxCount(){
    // 树洞主人获得所有的评论量
    if (this.data.isLogin && this.data.isHost){
      db.collection('index2_comments').where({
        fromID: this.data.treeholeid
      }).count()
      .then(res => {
        maxCount = res.total
      })
    }
    // 游客只能获得自己评论的评论量
    else if (this.data.isLogin && (!this.data.isHost)){
      db.collection("index2_comments").where({
        fromID: this.data.treeholeid,
        _openid: this.data.visiterOpenid
      }).count()
      .then(res=>{
        maxCount = res.total
      })
    }
  },

  /**
   * 获取点赞关系
   */
  getLikeTag(){
    console.log("获取点赞标识中.....")
    db.collection("index2_likeTag").where({
      treeholeid: this.data.treeholeid,
      _openid: this.data.visiterOpenid
    }).get()
    .then(res=>{
      console.log(res.data)
      if (res.data.length == 0){
        this.setData({
          likeTagid: "",
          isLike: false,
          likeIcon: "/pages/index2/logo/unlike.png",
          countState_1: this.data.likeCount + 1,
          countState_2: this.data.likeCount,
          color: "colorIfUserUnlike"
        })
        console.log("用户不喜欢这条树洞")
      }
      else{
        this.setData({
          likeTagid: res.data[0]._id,
          isLike: true,
          likeIcon: "/pages/index2/logo/like.png",
          oriLike: true,
          countState_1: this.data.likeCount,
          countState_2: this.data.likeCount - 1,
          color: "colorIfUserLike",
        })
        console.log("用户喜欢这条树洞")
      }
    })
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
        db.collection("index2_comments").add({
          data: {
            fromID: this.data.treeholeid,
            comment: this.data.commentDetails,
            time: dateTemp,
            commenterNickname: this.data.visitorName,
            commenterAvatar: this.data.visitorAvatar,
            isCertification: app.globalData.isDoctor,
            toID: toID,
            isRead: false,
          }
        })
        .then(res=>{
          console.log(this.data)
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
          db.collection('index2_comments').doc(tempid).remove()
          // 显示删除的提示界面
          that.getComments()
          wx.showToast({
            title: '删除成功',
          })
        } 
      } 
    })
  },

  click(){
    if (this.data.isLogin){
      let jTemp = !this.data.isLike
      this.setData({
        likeIcon: jTemp? "/pages/index2/logo/like.png": "/pages/index2/logo/unlike.png",
        color: jTemp? "colorIfUserLike": "colorIfUserUnlike",
        likeCount: jTemp? this.data.countState_1: this.data.countState_2,
        isLike: jTemp
      })
      console.log("用户原本喜欢这个树洞吗", this.data.oriLike)
      console.log("用户现在喜欢这个树洞吗",this.data.isLike)
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }
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
      if (this.data.isLogin && this.data.isHost){
        db.collection("index2_comments").where({
          fromID: this.data.treeholeid
        }).orderBy('time', 'desc').skip(oldData.length).limit(10).get()
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
      // 非树洞主人只能看到自己发的消息
      else if (this.data.isLogin && (!this.data.isHost)){
        db.collection("index2_comments").where({
          fromID: this.data.treeholeid,
          _openid: this.data.visiterOpenid
        }).orderBy('time', 'desc').skip(oldData.length).limit(10).get()
        .then(res=>{
          // 将新条目进行缝合
          let newList = res.data
          let newData = oldData.concat(newList)
          // 缝合好的新老数据传给data条目列表
          this.setData({
            comments: newData
          })
        })
      }
    }
    // 如果现在问题的数量等于问题总数量就显示‘加载完毕’
    else{
      this.setData({
        isShowSubmit: true
      })
    }
  },

  /**
   * 生命周期结束使更新值
   */
  onUnload(){
    // 更新对应树洞的点赞数
    db.collection("index2_treeholes").doc(this.data.treeholeid).get()
    .then(res=>{
      this.setData({
        likecountTemp: res.data.goodCount
      })
      console.log('当前点赞数',res.data.goodCount)
    })
    .then(res=>{
      console.log('shi',this.data.oriLike, this.data.isLike)
      // 如果以前喜欢，但是现在不喜欢，就把对应的点赞记录删除
      if (this.data.oriLike && !this.data.isLike){
        db.collection("index2_likeTag").doc(this.data.likeTagid).remove()
        .then(res=>{
          db.collection("index2_treeholes").doc(this.data.treeholeid).update({
            data:{
              goodCount: this.data.likecountTemp - 1
            }
          })
        })
      }
      // 如果以前不喜欢，现在喜欢，则加上对应的点赞记录
      else if (!this.data.oriLike && this.data.isLike){
        console.log('likeTag新增了条数据')
        db.collection("index2_likeTag").add({
          data:{
            treeholeid: this.data.treeholeid
          }
        })
        .then(res=>{
          db.collection("index2_treeholes").doc(this.data.treeholeid).update({
            data:{
              goodCount: this.data.likecountTemp + 1
            }
          })
        })
      }
    })
  },

  // 从全局变量中获取用户的微信名和微信头像
  getInfo: function(){
    let that = this
    db.collection('User').where({
      _openid: app.globalData.openid
    }).count().then(res => {
      console.log("用户是否修改过昵称和头像", res.total>0)
      if (res.total > 0){
        db.collection('User').where({
          _openid: app.globalData.openid
        }).field({
          avatarUrl: true,
          nickName: true
        }).get().then(res =>{
          console.log(res.data[0])
          that.setData({
            visitorName: res.data[0].nickName,
            visitorAvatar: res.data[0].avatarUrl
          })
        })
      } else {
        that.setData({
          visitorName: app.globalData.userInfo.nickName,
          visitorAvatar: app.globalData.userInfo.avatarUrl
        })
      }
    })
  }
})