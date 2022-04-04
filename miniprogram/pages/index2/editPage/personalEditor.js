const db = wx.cloud.database(); // 获取后台的数据库
const app = getApp(); //  获得全局变量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",         // 用户的昵称
    userAvatar: "",       // 用户的头像
    treeholeText: "",     // 原文
    treeholeHtml: "",     // 具有html格式的内容
    chooseIndex: "",      // 选择分区时各个区域的位置指数
    isChose: false,       // 判断是否选择了分区
    isGetFromUser: false, // 判断此用户是否更换过名字和头像
    isAnonymous: false,   // 判断是否匿名, 默认不匿
    chooseRegionColor:    // 和选择分区对应的颜色
    [ 
      "theWork",
      "theExam",
      "theEmotion",
      "theLife",
      "theStudy",
      "theGame"
    ],
    chooseRegion: [
      "工作区",
      "考研区",
      "情感区",
      "生活区", 
      "学习区",  
      "游戏区",  
    ]
  },

  onLoad: function() {
    this.setData({
      chooseIndex: this.options.index,
      isChose: this.options.index? true: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.getInfo()
  },

  /**
   * 在在富文本编辑器中写入后会将原文和详细内容都存到里去
   */
  onInputtingDesc: function (e) {
    let html = e.detail.html;   //相关的html代码
    let originText = e.detail.text;  //text，不含有任何的html标签
    this.setData({
      treeholeHtml: html,
      treeholeText: originText
    });
  },

  /**
   * 点击按钮发送树洞
   * 在此进行了延迟的模拟以提高用户体验和避免用户多次提交
   * 并且此动作对用户树洞的规范性进行了检查，包括：
   * 1.用户树洞有无内容以及内容是否太短
   * 2.用户是否没有选择树洞的分区
   * @param {点击事件} e 
   */
  sendMsg: function(e){
    console.log("目前树洞的长度是", this.data.treeholeText.length)
    // 树洞如果什么都没有写则会提示写内容
    if (this.data.treeholeText.length == 0) {
      wx.showToast({
        title: '树洞不能为空呢',
        image: "/pages/index2/logo/failForVoidTreehole.png",
        duration: 2000//持续的时间
      })

    // 限制树洞字数不小于20字，否则提示内容太少
    } else if (this.data.treeholeText.length < 20) {
      wx.showToast({
        title: '树洞长度小于20',
        image: "/pages/index2/logo/failForShortContent.png",
        duration: 2000//持续的时间
      })

    // 内容字数比较符合，进入发布前检查的下一步
    } else {
      // 如果没有选择分区将会提示，该
      if (!this.data.isChose) {
        wx.showToast({
          title: '亲，未选分区',
          image: "/pages/index2/logo/failForNoChooseRegin.png",
          duration: 2000//持续的时间
        })
      }
      else {
        // 显示正在发送
        this.setData({
          sendClicked: true
        })
        wx.showLoading({
          title: '发布中...',
          mask: true,
        });

        /**
         * 调用云函数check字符串合法性
         */
        wx.cloud.callFunction({
          name: "checkMsg",
          data: {
            content: this.data.treeholeText,
          },}).then((res) => {
          console.log(res);
          const errcode = res.result.data.errcode;
          // 检测到文本错误时,做一些业务
          if (errcode == 87014) {
            wx.hideLoading()
            wx.showToast({
              // 当内容违规时,做一些用户提示
              title: "您输入的文本内容含有敏感内容,请重新输入",
              icon:'none',
              duration:3000,
            });
          } else {
            // 成功时做其他业务操作
            console.log(res);
            this.publicTreeHole();
            console.log(this.data)
          }}).then(res =>{
          // 显示发送成功
          setTimeout(function (){
            wx.hideLoading()
            wx.navigateBack({changed: true})
          }, 2000);
        }) // end then
      } 
    } 
  },

  /**
   * 发布树洞函数
   */
  publicTreeHole(){
    // 正式发送，内容包括
    // 对应的分区chooseRegin[chooseIndex]
    // 是否匿名isAnonymous
    // 正文内容treeholeDetails
    // 点赞数(初始都为0)
    // 发布时间（当前时间戳）
    var now = new Date().getTime();
    db.collection("index2_treeholes").add({
      data: {
        goodCount: 0,
        mainBody: this.data.treeholeText,
        mainHtml: this.data.treeholeHtml,
        tag: this.data.chooseRegion[this.data.chooseIndex],
        time: now,
        isAnonymous: this.data.isAnonymous,
        nickName: this.data.userName,
        avatar: this.data.userAvatar
      }})
  },


  /**
   * 更换选择条的样式和内容
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chooseIndex: e.detail.value,
      isChose: true
    })
  },

  /**
   * 使匿名选项可以被自由地取消(之前的不可以自由取消)
   */
  // radioBindtap: function(e) {
  //   this.setData({
  //     isAnonymous: !this.data.isAnonymous
  //   })
  // },

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
            userName: res.data[0].nickName,
            userAvatar: res.data[0].avatarUrl
          })
        })
      } else {
        that.setData({
          userName: app.globalData.userInfo.nickName,
          userAvatar: app.globalData.userInfo.avatarUrl
        })
      }
    })
  }
})