// miniprogram/pages/index1/advice/newDetail/newDetail.js
const app = getApp()
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:null,
    today:null,
    tomorrow:null,
    freeTimeList:null,
    day:null,    //用于显示日期
    month:null,  //用于显示日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = Date.parse(options._futureDay);
    let date_today = new Date(options._futureDay);
    let month = date_today.getMonth()+1;
    let day = date_today.getDate();
    console.log(month,day)
    let tomorrow = today + 86400000;
    this.setData({
      openId:app.globalData.openid,
      today:today,
      tomorrow:tomorrow,
      month:month,
      day:day,
    })
    this.getFreeTimeList(today,tomorrow)
  },

  //获取当前日期可预约医生及时间段信息
  getFreeTimeList(today,tomorrow){
    db.collection("doctor_freeTime").orderBy('timeCount','asc').limit(20).where({
      isBooked:false,
      timeCount: _.and(_.gt(today), _.lt(tomorrow))
    })
    .get().then(res=>{
      console.log("freeTime:",res.data)
      this.setData({
        freeTimeList:res.data
      })
    })
  },

  // 预约点击事件
  adviceTap(e){
    let doctorId = e.currentTarget.dataset.docid;
    let timeCount = e.currentTarget.dataset.timecount;
    let _id = e.currentTarget.dataset.id;
    let groupId = this.data.openId+Date.now();
    let members = [this.data.openId,doctorId];
    var that = this;
    let lastWeek = this.data.today - 518400000;
    let nextWeek = this.data.today + 518400000;

    //检测该用户前后6天有无预约记录（咨询房间）
    db.collection("chatroom_group").where({
      members: _.all([this.data.openId]),
      timeCount: _.and(_.gt(lastWeek), _.lt(nextWeek))
    })
    .count().then(res=>{
      if(res.total>0){
        wx.showToast({
          title: '一周内只能预约一次~',
          icon:'none',
        })
      }else{
        //前后6天无预约记录，可预约
        wx.showModal({
          title: '您确认预约吗',
          content: '',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#f58220',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              db.collection("chatroom_group").where({
                members: _.all([doctorId]),
                timeCount: timeCount,
              })
              .count().then(res=>{
                if(res.total==0){
                  //更新isBooked为true
                  db.collection("doctor_freeTime").doc(_id).update({
                    data:{
                      isBooked:true,
                    }
                  }).then(res=>{
                    console.log("已更新")
                    wx.showToast({
                      title: '预约成功',
                    })
                    that.getFreeTimeList(that.data.today,that.data.tomorrow);
                    console.log("添加成功")
                  })
    
                  //添加房间记录
                  db.collection("chatroom_group").add({
                    data: {
                      adviceId: _id,
                      timeCount: timeCount,
                      groupId: groupId,
                      members:members,
                    }
                  }).then(res => {

                  })
                }else{
                  //在浏览的时间里已被其他用户预约
                  wx.showToast({
                    title: '慢了一步哟~',
                    icon: 'none',
                  })
                  that.getFreeTimeList(that.data.today,that.data.tomorrow);
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  }

})