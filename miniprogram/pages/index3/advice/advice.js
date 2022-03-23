const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */data: {
    items: ['异常闪退', '跳转异常', '加载错误', '其他问题'],

    shopitem: '默认排序',//默认显示的

    content: ""

  },



  bindshop: function (event) {
    var classify = event.currentTarget.dataset.classify;
    console.log(classify) //输出的结果就是你点击的
    this.setData({
      shopitem: classify, //更新

    })

  },
  go_back_index3() {
    wx.navigateBack({
      delta: 1
    });

  },

  btnSub(res) {
    var content = res.detail.value.content;
    if(content.length<=10){
      wx.showToast({
        title: '请填写十个字以上的问题',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
    else{
      // 检查敏感信息
      var flag=false;
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}',
        method: 'GET',
        success: res => {
            var access_token = res.data.access_token;
            console.log(access_token)
            wx.request({
                method: 'POST',
                url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`,
                data: {
                    content:content
                },
                success(res) {
                    if (res.errcode !== 87014) {
                        // 合格
                        flag=true;
                    }
                }
            })
        },
        fail() {
            console.log(res);
        }
    })
    if(flag==true){
      db.collection("index3_feedback").add({
      data: {
        content: content,
        shopitem: this.data.shopitem


      }
    }).then(res => {
      console.log(res)
    })

    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    })
    }
    else{
      wx.showToast({
        title: '您的内容含有敏感信息，请重新编辑',
        icon: 'none',
        image: '',
        duration: 3500,
        mask: true,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
    }
    
    // this.go_back_index3();


  }
})