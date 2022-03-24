// pages/index3/diary/diary.js

const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    is_hide: "",
    isSrc: false,
    pictures: "",
  },
  setTitle: function (e) {
    this.setData({
      title: e.detail.value,
    });
  },
  setContent: function (e) {
    this.setData({
      content: e.detail.value,
    });
  },
  go_back_diary() {
    // wx.navigateBack({
    //   delta: 1
    // });
    wx.navigateTo({
      url: "/pages/index3/diary/diary",
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  //检查敏感图片
  checkPic() {
    wx.uploadFile({
      url:
        "https://api.weixin.qq.com/wxa/img_sec_check?access_token=" +
        accesstoken,
      method: "POST",
      filePath: tempFilePaths[i],
      name: "file",
      header: {
        "Content-Type": "application/octet-stream", //一定要设置header头部信息’Content-Type’: ‘application/octet-stream’
      },
      formData: {
        media: tempFilePaths[i],
      },
      success: function (res) {
        if (JSON.parse(res.data).errcode === 87014) {
          uni.showModal({
            content: "图片中含有内含有敏感信息,禁止上传",
            showCancel: false,
          });
        }
      },
    });
  },
  //
  uploadPic() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pictures: res.tempFilePaths[0],
        });
      },
      fail() {
        wx.showToast({
          icon: "none",
          title: "上传失败",
        });
      },
    });
    this.setData({
      isSrc: true,
    });
    console.log(this.data.isSrc);
  },

  cloudfile(picName) {
    console.log("开始上传");
    wx.cloud
      .uploadFile({
        cloudPath: "index3/diary/" + picName,
        filePath: this.data.pictures,
      })
      .then((res) => {
        console.log("成功上传到云端");
      });
  },

  // 测试
  //     特3456书yuuo莞6543李zxcz蒜7782法fgnv级完2347全dfji试3726测asad感3847知qwez到
  // 
  _requestCloudMsgCheck:async function() {
    let content = this.data.content;
    var fl=true;
    const res = await wx.cloud.callFunction({
        name: "checkMsg",
        data: {
          content: content,
        },
      })
    console.log(res);
    const errcode = res.result.data.errcode;
        // 检测到文本错误时,做一些业务
    if (errcode == 87014) {
          fl=false
          wx.showToast({
            // 当内容违规时,做一些用户提示
            title: "您输入的文本内容含有敏感内容,请重新输入",
            icon:'none',
            duration:3000,
          });
    }
    return fl
  },
  async sendNewMood(res) {
    let picName = "";
    let title = res.detail.value.title;
    //var mood=res.detail.value.mood;
    let content = res.detail.value.content;
    let is_hide = res.detail.value.is_hide;
    if (title.length == 0) {
      wx.showToast({
        title: "亲，请先填写一下标题",
        icon: "none",
        image: "",
        duration: 2000,
        mask: false,
        success: (result) => {},
        fail: () => {},
        complete: () => {},
      });
    } else {
      if (content.length <= 5) {
        wx.showToast({
          title: "亲，请填写不少于5个字的内容哦",
          icon: "none",
          image: "",
          duration: 2000,
          mask: false,
          success: (result) => {},
          fail: () => {},
          complete: () => {},
        });
      } else {
        // 判断文字敏感信息
        let isValid=await this._requestCloudMsgCheck()
        console.log(isValid)

        if(isValid==true){
        //判断图片格式
        if (this.data.pictures.endsWith(".jpg")) {
          picName = title + "_pic.jpg";
        } else if (this.data.pictures.endsWith(".png")) {
          picName = title + "_pic.png";
        } else if (this.data.pictures.endsWith(".svg")) {
          picName = title + "_pic.svg";
        }

        console.log(picName);
        if (picName != "") {
          console.log(picName);
          //上传至云端
          this.cloudfile(picName);
          db.collection("index3_diary")
            .add({
              data: {
                title: title,
                content: content,
                is_hide: is_hide,
                pic:
                  "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index3/diary/" +
                  picName,
                //pictures:pictures
              },
            })
            .then((res) => {
              console.log(res);
            });
        } else {
          db.collection("index3_diary")
            .add({
              data: {
                title: title,
                content: content,
                is_hide: is_hide,
                pic: "",
                //pictures:pictures
              },
            })
            .then((res) => {
              console.log(res);
            });
        }
        this.setData({
          pictures: "",
          isSrc: false,
        });
        wx.showToast({
          title: "提交成功", //弹框内容
          icon: "success", //弹框模式
          duration: 2000, //弹框显示时间
        });
      }
      else{
        console.log("重新编辑")
      }

    }
    }
    // this.go_back_diary()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
