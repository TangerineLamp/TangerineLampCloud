const db = wx.cloud.database();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    flag:0,
    user: {},
    nickName: "",
    author: "",
    introImage: "/icons/none_img.png",
    body: "/icons/none_img.png",
  },
  onLoad: function (options) {
    // let userInfo=wx.getStorageSync('userInfo');
    // console.log(userInfo)
    let openid = app.globalData.openid;
    let userInfo = app.globalData.userInfo;
    this.setData({
      flag:0
    })
    console.log(userInfo);
    console.log(openid);
    db.collection("User")
      .where({
        _openid: openid,
      })
      .count()
      .then((res) => {
        console.log(res.total);
        if (res.total == 0) {
          db.collection("User")
            .add({
              data: {
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
              },
            })
            .then((res) => {
              // db.collection("User")
              // .where({
              //   _openid: openid,
              // })
              // .get()
              // .then((res) => {
              //   console.log(res.data);
              //   this.setData({
              //     user: res.data,
              //   });
              // });
              console.log("添加成功");
            });
        }
        // 异步问题
        db.collection("User")
          .where({
            _openid: openid,
          })
          .get()
          .then((res) => {
            console.log(res.data);
            this.setData({
              user: res.data,
              nickName: res.data[0].nickName
            });
          });
      });
    // avatarUrl  nickName _openid
    // db.collection("User")
    // .where({
    //   _openid: openid,
    // })
    // .get()
    // .then((res) => {
    //   console.log(res.data);
    //   this.setData({
    //     user: res.data,
    //   });
    // });
    
    this.setData({
      title: openid+Math.random(),
    });
    this.setData({
      nickName: userInfo.nickName,
      // introImage: userInfo.avatarUrl
    });

    // const result = await db.collection("User").where({
    //   _openid:openid
    // }).get().then(res=>{
    //   console.log(res.data)//打印返回结果
    //   //之后编写 需要利用返回数据的代码 看个人情况吧
    // }).catch(err=>{
    // console.log(err)//打印错误信息
    // })
    // console.log(user)
    // this.setData({
    //   nickName:userInfo.nickName
    // })
  },
  //获取并set词条大标题输入内容
  // handleTitle(e) {
  //   this.setData({
  //     title: e.detail.value,
  //   });
    
  //   console.log(this.data.user);
  // },

  //获取并set简介输入内容
  handleAuthor(e) {
    this.setData({
      nickName: e.detail.value,
    });
    // this.setData({
    //   flag:1
    // })
  },

  // 获取封面
  chooseCover() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          introImage: res.tempFilePaths[0],
          flag:1
        });
      },
      fail() {
        wx.showToast({
          icon: "none",
          title: "上传失败",
        });
      },
    });
  },

  

  // 展示提交窗口
  showPopup() {
    var that = this;
    wx.showModal({
      title: "录入数据",
      content: "确定提交数据？",
      cancelColor: "cancelColor",
      success(res) {
        if (res.confirm) {
          that.commit();
          wx.navigateBack({
            delta: 1,
          })
          wx.showToast({
            title: "提交成功",
            duration: 1500,
            mask: true,
          });
        } else if (res.cancel) {
        }
      },
    });
  },

  //提交数据
  commit() {
    console.log("flag:",this.data.flag)
    var that = this;
    console.log("提交成功");
    let pushTime = new Date();
    let openid = app.globalData.openid;
    let introImageName = ""; //介绍图片
    // let passageLongPictureName = ""; //文章长图，仅支持上传一张
    //判断介绍图片格式
    if (this.data.introImage.endsWith(".jpg")) {
      introImageName = this.data.title + ".jpg";
    } else if (this.data.introImage.endsWith(".png")) {
      introImageName = this.data.title + ".png";
    } else if (this.data.introImage.endsWith(".svg")) {
      introImageName = this.data.title + ".svg";
    }
    // //判断文章长图格式
    // if(this.data.body.endsWith(".jpg")){
    //   passageLongPictureName = this.data.title + "_passageBody.jpg"
    // }else if(this.data.body.endsWith(".png")){
    //   passageLongPictureName = this.data.title + "_passageBody.png"
    // }else if(this.data.body.endsWith(".svg")){
    //   passageLongPictureName = this.data.title + "_passageBody.svg"
    // }
    // 修改
    
    // db.collection("index0_passageLongPicture").add({
    //   data:{
    //     title:this.data.title,
    //     author:this.data.author,
    //     introImage:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/introImage/"+introImageName,
    //     body:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/body/"+passageLongPictureName,
    //     pushTime:pushTime
    //   }
    // })
    if(this.data.flag==1){
      wx.cloud.deleteFile({
        fileList: [this.data.user[0].avatarUrl]
      }).then(res => {
        console.log("删除成功")
        that.cloudFile(introImageName)
        db.collection("User")
        .where({
          _openid: openid,
        })
        .update({
          data: {
            avatarUrl:
              "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/user_info/avatar/" +
              introImageName,
            nickName: this.data.nickName,
          },
        })
      }).catch(error => {
        // handle error
      })



    }
    else{
      db.collection("User")
      .where({
        _openid: openid,
      })
      .update({
        data: {
          nickName: this.data.nickName,
        },
      })
      .then((res) => {
        console.log(res);
        // wx.hideLoading()
      });
    }
    
    // this.setData({
    //   title:"",
    //   author:"",
    //   introduce_words:"",
    //   introImage:"/icons/none_img.png",
    //   body:"/icons/none_img.png"
    // })
  },

  // 储存图片至云端
  cloudFile(introImageName) {
    wx.cloud
      .uploadFile({
        cloudPath: "user_info/avatar/" + introImageName,
        filePath: this.data.introImage,
      })
      .then((res) => {});
    // wx.cloud.uploadFile({
    //   cloudPath:"index0/passage-longPicture/body/"+passageLongPictureName,
    //   filePath:this.data.body
    // }).then(res=>{})
  },
});
