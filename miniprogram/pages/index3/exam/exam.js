//index.js
//获取应用实例
var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
const db = wx.cloud.database();
const _ = db.command;
//const com = require("../../../com.js");
Page({
  data: {
    calendarSignData: [],//当月签到的每天
    signcount: '',//总计签到加1
    signdata: '',//当天日期 
    calendarSignDay: '',//当月签到次数
    signmonth: ''//当月签到次数
  },
  //事件处理函数
  calendarSign: function () { 
    var that=this;
    console.log(calendarSignData); 
   // var _id = app.globalData._id;
   //问题出在这里，_id的值没有get到显示是空的
    var _id = app.globalData._id;
    db.collection('sign_in_test').doc(_id).update({
      data: {
        signdata: _.push([date]),//每月签到日期
        signcount: _.inc(1),//总计签到加1
        signmonth: _.inc(1)//当月签到次数
      },
      success: res => {
        console.log("testCmdInc success", res);
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          ["calendarSignData[" + date + "]"]: date,
          signcount: this.data.signcount + 1,
          calendarSignDay: this.data.signmonth + 1
        })
        db.collection('sign_in_test').doc(_id).get({
          success: function (res) {
            var userInfo = res.data
            wx.setStorageSync('user', userInfo);
          }
        })
        that.pointsadd("qiandao", '10');
      },
    });

  },
  onLoad: function () {
    const that = this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp;
    if (date <= 7) {
      nbsp = day;
    } else {
      nbsp = 7 - ((date - day) % 7)
    }
    console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    var userInfo = app.globalData.userInfo; 
    if (date == 1&&userInfo.signmonth==0) {
      var updatadata = {
        signdata: [],//每月签到日期 
        signmonth: 0//当月签到次数
      };
      var _id = app.globalData._id;
      db.collection('sign_in_test').doc(_id).update({
        data: updatadata,
        success: function (res) {
          //更新成功重置缓存数据
          db.collection('sign_in_test').doc(_id).get({
            success: function (res) {
              var userInfo = res.data
              wx.setStorageSync('user', userInfo);
              app.globalData.userInfo = userInfo;
              if (!userInfo.signdata) {
                calendarSignData = new Array(monthDaySize);
              } else {
                calendarSignData = new Array(monthDaySize);
                for (var y = 0; y < userInfo.signdata.length; y++) {
                  calendarSignData[userInfo.signdata[y]] = userInfo.signdata[y];
                }
              }
              var _id = app.globalData._id;
              that.setData({
                _id: _id, 
                calendarSignData: calendarSignData,//当月签到的每天
                signcount: userInfo.signcount,//总计签到加1
                signdata: userInfo.signdata,//当天日期
                calendarSignDay: userInfo.signmonth,//当月签到次数
                signmonth: userInfo.signmonth//当月签到次数 
              })
             
            }
          })
        },
      })
    } else {
      // 不是1号直接取缓存数据
      if (app.globalData.userInfo) {
        var userInfo = app.globalData.userInfo;
        if (!userInfo.signdata) {
          calendarSignData = new Array(monthDaySize);
        } else {
          calendarSignData = new Array(monthDaySize);
          for (var y = 0; y < userInfo.signdata.length; y++) {
            calendarSignData[userInfo.signdata[y]] = userInfo.signdata[y];
          }
        }
        var _id = app.globalData._id;
        this.setData({
          _id: _id,
          calendarSignData: calendarSignData,//当月签到的每天
          signcount: userInfo.signcount == null ? 0 : userInfo.signcount,//总计签到加1
          signdata: userInfo.signdata == null ? 0 : userInfo.signdata,//当天日期
          calendarSignDay: userInfo.signmonth == null ? 0 : userInfo.signmonth,//当月签到次数
          signmonth: userInfo.signmonth == null ? 0 : userInfo.signmonth//当月签到次数 
        })
      }
    }
    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
  },
  pointsadd: function (Type, qty) {
    var openid = app.globalData._id;
    var date = com.nowTime();
    console.log("增加积分" + openid + "--" + app.globalData._id);
    wx.cloud.callFunction({
      name: 'points',
      data: {
        $url: 'points/manage/add',
        Type: Type,
        UserId: openid,
        createTime: date,//创建时间
        updateTime: date//修改时间
      },
      success(res) {
        console.log("success", res);
        wx.showToast({
          title: '积分+' + qty,
        });
      },
      fail(res) {
        console.log("fail", res)
      },
      complete(res) {
        console.log("complete", res)
      }
    })
  }
})

