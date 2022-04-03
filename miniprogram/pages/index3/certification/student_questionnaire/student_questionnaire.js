// miniprogram/pages/index1/test1/testlists/pcl-5/pcl-5.js
const db = wx.cloud.database();
const _ = db.command
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasChoose_one: false,     // 是否已选择问题1
    hasChoose_two: false,     // 是否已选择问题2
    degree: "",               // 学习阶段
    question_type: "",        // 咨询问题类型
    openid: "",               // 用户openid
    isCertified: false,       // 是否已验证过学生身份
  },

  onLoad(){
    this.setData({
      openid: app.globalData.openid
    })
    this.isCertified(app.globalData.openid);
  },

  // 获取该用户是否已经验证过学生身份
  isCertified(openId){
    db.collection("CertiStudent")
    .where({
      _openid:openId,
    })
    .count()
    .then(res=>{
      if(res.total>0){
        this.setData({
          isCertified: true,
        })
      }
    })
  },

  //选择问题1答案
  chooseAnswer(e) {
    let currentChosen = e.currentTarget.dataset.index;
    let degree = e.currentTarget.dataset.degree;
    console.log(degree)
    this.setData({
      currentChosen:currentChosen,
      degree:degree,
      hasChoose_one:true,
    })
  },

    //选择问题2答案
    chooseAnswer1(e) {
      let currentChosen1 = e.currentTarget.dataset.index;
      let question_type = e.currentTarget.dataset.question_type;
      console.log(question_type)
      this.setData({
        currentChosen1:currentChosen1,
        question_type:question_type,
        hasChoose_two:true,
      })
    },

  //点击下一题 or 提交--> 根据nowIndex判断是下一题还是查看结果分析
  submit_question() {
    if(!this.data.hasChoose_one){
      wx.showToast({
        title: '请选择学习阶段',
        icon: 'none',
      })
    }else if(!this.data.hasChoose_two){
      wx.showToast({
        title: '请选择咨询类型',
        icon: 'none',
      })
    }else if(this.data.isCertified){
      wx.showToast({
        title: '已提交过问卷',
        duration:2000,
        mask:true,
        icon: 'none',
      })
    }else{
      db.collection("CertiStudent")
      .add({
        data:{
          degree: this.data.degree,
          question_type: this.data.question_type,
          isCertification: true,
        }
      })
      .then(res=>{
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '提交成功',
          duration:2000,
          mask:true
        })
      })
    }
  },

})