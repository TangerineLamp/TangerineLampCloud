const db = wx.cloud.database(); // 获取后台的数据库
const app = getApp(); //  获得全局变量

Page({

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfo()
  },

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",         // 用户的昵称
    userAvatar: "",       // 用户的头像
    treeholeDetails: "",  // textArea里面的细节
    chooseIndex: "",      // 选择分区时各个区域的位置指数
    isChose: false,       // 判断是否选择了分区
    isAnonymous: true,    // 判断是否匿名, 默认不匿
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

  /**
   * 在textArea中写入后会将内容传到暂存的数据treeholeDetails里去
   */
  bindTextAreaInput: function(e) {
    this.setData({
      treeholeDetails: e.detail.value,
    });
    // console.log("树洞内容：", this.data.treeholeDetails);
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
    console.log("目前树洞的长度是", this.data.treeholeDetails.length)
    // 树洞如果什么都没有写则会提示写内容
    if (this.data.treeholeDetails.length == 0) {
      wx.showToast({
        title: '树洞不能为空呢',
        // 这个是云储存里面的路径
        // image: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/failForVoidTreehole.png',
        // 这个是本地文件的路径
        image: "/pages/index2/logo/failForVoidTreehole.png",
        duration: 2000//持续的时间
      })

    // 限制树洞字数不小于20字，否则提示内容太少
    } else if (this.data.treeholeDetails.length < 20) {
      wx.showToast({
        title: '树洞长度小于20',
        // 这个是云储存的路径
        // image: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/failForShortContent.png',
        // 这个是本地文件的路径
        image: "/pages/index2/logo/failForShortContent.png",
        duration: 2000//持续的时间
      })

    // 内容字数比较符合，进入发布前检查的下一步
    } else {
      // 如果没有选择分区将会提示，该
      if (!this.data.isChose) {
        wx.showToast({
          title: '亲，未选分区',
          // 这个是云储存的路径
          // image: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/logo/failForNoChooseRegin.png',
          // 这个是本地文件的路径
          image: "/pages/index2/logo/failForNoChooseRegin.png",
          duration: 2000//持续的时间
        })
      }
      else {
        // 显示正在发送
        wx.showLoading({
          title: '发布中...',
        });
        
        // 正式发送，内容包括
        // 对应的分区chooseRegin[chooseIndex]
        // 是否匿名isAnonymous
        // 正文内容treeholeDetails
        // 点赞数(初始都为0)
        // 发布时间
        var now = new Date();
        db.collection("index2_treeholes").add({
          data: {
            goodCount: 0,
            mainBody: this.data.treeholeDetails,
            tag: this.data.chooseRegion[this.data.chooseIndex],
            time: now,
            isAnonymous: this.data.isAnonymous,
            nickName: this.data.userName,
            avatar: this.data.userAvatar
          }
        }).then(res =>{
          // 显示发送成功
          setTimeout(function (){
            wx.hideLoading()
            // 发布成功，引导用户离开编辑页面
            wx.showModal({
              title: '发布成功！',
              content: '再写一个树洞？',
              success: function (res) {
                // 点击了确定以后会重新进入编辑页面界面
                if (res.confirm) { 
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: "/pages/index2/editPage/personalEditor",
                  })
                // 点击了取消以后会转换进入树洞广场界面
                } else { 
                  console.log('用户点击取消')
                  wx.switchTab({
                    url: "/pages/index2/index2",
                  })
                }
              }
            }) // end wx.showModal
          }, 2000);
        }) // end then
        console.log('储存树洞成功')
        console.log(this.data.userAvatar)
        console.log(this.data.userName)
      } // end else in if(!Chose)
    } // end else in if(this.data.treeholeDetails.length)
  }, // end function senMsg

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
  radioBindtap: function(e) {
    this.setData({
      isAnonymous: !this.data.isAnonymous
    })
  },

  // 从全局变量中获取用户的微信名和微信头像
  getInfo: function(){
    // 此部分内容暂时不用
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']){
    //       console.log(res.authSetting)
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log('用户信息返回成功')
    //           console.log(res.userInfo)
    //           this.setData({
    //             userName: res.userInfo.nickName,
    //             userAvatar: res.userInfo.avatarUrl
    //           });
    //         }
    //       })
    //     }
    //   }
    // })
    console.log("用户信息返回成功",app.globalData.userInfo)
    this.setData({
      userName: app.globalData.userInfo.nickName,
      userAvatar: app.globalData.userInfo.avatarUrl
    })
  }
})