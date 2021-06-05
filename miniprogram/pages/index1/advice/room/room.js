const app = getApp()

Page({
  data: {
    avatarUrl: '/icons/none_img.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    // chatRoomEnvId: 'release-f8415a',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: '',
    chatRoomGroupName: '小橘灯在线咨询',

    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
  },

  onLoad: function(options) {
    console.log(options);
    const {groupId, timeCount} = options;
    this.setData({
      chatRoomGroupId:groupId
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
    })

    wx.getSystemInfo({
      success: res => {
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })

    let timeNow = Date.now();
    let timeCountNumber = parseInt(timeCount)
    console.log(timeCountNumber)
    if(timeNow>(timeCountNumber+3000000)){
      wx.showToast({
        title: '咨询已结束',
        icon:"error",
        duration:1500
      })
    }
    
  },

  getOpenID: async function() {
    if (this.openid) {
      return this.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })

    return result.openid
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '即时通信 Demo',
      path: '/pages/index1/advice/room/room',
    }
  },
})
