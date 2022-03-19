//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        // env: 'tangerine-cloud-5g4h71uo73fc1edb'
      })
    }

    this.globalData = {
      userInfo: null,     // 用户的昵称和头像信息
      isLogin: false,     // 用户是否已经登录
      openid: null,       //  用户的openid
      isDeveloper: false, //  是否是开发人员
      isDoctor: false,    //  是否是认证医师
      isCertiStudent: false,   //  是否是认证学生
      treehole: {         //  存储树洞的各种配置
        "work": {
          type: '工作区', 
          color: "#5C92F1",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/work_p.svg",
          index: 0,
        },
        "exam": {
          type: '考研区', 
          color: "#E95BB8",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/exam_p.svg",
          index: 1,
        },
        "emotion": {
          type: '情感区', 
          color: "#F41010",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/emotion_p.svg",
          index: 2,
        },
        "life": {
          type: '生活区', 
          color: "#AAB20E",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/life_p.svg",
          index: 3,
        },
        "study": {
          type: '学习区', 
          color: "#17AD17",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/study_p.svg",
          index: 4,
        },
        "game": {
          type: '游戏区', 
          color: "#C26BE7",
          avatar: "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index2/anonymous/game_p.svg",
          index: 5,
        },
      }
    }
  }
})
