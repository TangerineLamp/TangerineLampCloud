// miniprogram/pages/index1/advice/newDetail/newDetail.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
var maxCount = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceTimeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = this.getNowDate();
    this.getAdviceTimeList(today);
    this.getMaxCount(today);
  },

  //获取当前日期以往后已被预约时间
  getAdviceTimeList(today){
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(10).where({
      isBooked:true,
      timeCount: _.gt(today),
    })
    .get().then(res=>{
      console.log("freeTime:",res.data)
      this.setData({
        adviceTimeList:res.data
      })
    })
  },

    // 工具函数 —— 获取今天的时间戳
    getNowDate(){
      let timestamp = Date.parse(new Date());
      let nowTime = new Date(timestamp);
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth();
      let date = nowTime.getDate();
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      let time = year + "/" + month + "/" + date;
      let nowDate = Date.parse(new Date(time));
      return nowDate;
    },

    //获取咨询预约数量
    getMaxCount(today){
      db.collection('doctor_freeTime')
      .where({
        isBooked:true,
        timeCount: _.gt(today),
      })
      .count()
      .then(res => {
        maxCount = res.total
      })
    },
  
      /**
     * 只要触底就进行更新
     * 直至将collection中的评论条目更新完
     */
    onReachBottom: function(){
      let today = this.getNowDate();
      let oldData = this.data.adviceTimeList;
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
          db.collection("doctor_freeTime")
          .where({
            isBooked:true,
            timeCount: _.gt(today),
          })
          .orderBy('timeCount', 'asc')
          .skip(oldData.length)
          .limit(10)
          .get()
          .then(res=>{
            // 将新条目进行缝合
            let newList = res.data
            let newData = oldData.concat(newList)
            // 缝合好的新老数据传给data中条目列表
            this.setData({
              adviceTimeList: newData
            })
          })
      }
      // 如果现在问题的数量等于问题总数量就显示‘加载完毕’
      else{
        this.setData({
          isShowSubmit: true
        })
        wx.showToast({
          title: '到底了哦',
          icon: 'success',
          duration: 1000
        })
      }
    },


})