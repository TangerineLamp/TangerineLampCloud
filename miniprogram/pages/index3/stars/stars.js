const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    isQianDao: false,
    content: "每日签到",
    nowdaycolor: "",
    alreadylist: [],
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    picList:[]
  },
  onLoad: function () {
    var picList=[]
    picList.push("cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/logo/左.png")
    picList.push("cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/logo/右.png")
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
      picList:picList
    })
    console.log(this.data.picList)
    this.getData();
    this.checkIsQianDao();
    this.isColor();

  },
  checkIsQianDao() {
    //查询今天是否已经签到
    db.collection("index3_qiandao_daily")
      .where({
        _openid: app.globalData.openid,
        // _openid: app.globalData.openid,
        isToday: this.data.isToday
      })
      .get({
        success: res => {
          console.log(res)
          if (res.data.length == 0) {
            this.setData({
              isQianDao: false,
              content: "每日签到"
            })
          }
          else {
            this.setData({
              isQianDao: true,
              content: "今日已签到"
            })
          }
        }
      })
    // .get().then(res => {
    //   this.setData({
    //     isQianDao: true,
    //     content: "今日已签到"
    //   })
    // })

  },
  checkDate(date) {
    let flag = false
    console.log(flag)
    for (let i = 0; i < alreadylist.arrLen(); i++) {
      if (this.data.alreadylist[i].isToday == date) {
        flag = true;
        break;
      }
    }
    console.log(flag)
    return flag
  },
  // getData() {
  //   db.collection("index3_qiandao_daily").get()
  //     .then(res => {
  //       this.setData({
  //         alreadylist: res.data
  //       })
  //     })
  // },
  getData() {
    db.collection("index3_qiandao_daily")
      .where({
        _openid:app.globalData.openid
      })
      .get()
      .then(res => {
        let alreadylist = res.data;
        let dateArr = this.data.dateArr;
        for (let i = 0; i < alreadylist.length; i++) {
          for (let j = 0; j < dateArr.length; j++) {
            if (alreadylist[i].isToday == dateArr[j].isToday) {
              dateArr[j].isColor = true;
            }
          }
        }
        this.setData({
          dateArr
        })
      })
  },
  isColor() {
    let copy = []
    copy = this.data.dateArr
    for (let i = 0; i < this.data.alreadylist.arrLen; i++) {
      for (let j = 0; j < this.data.dateArr.arrLen; j++) {
        if (this.data.alreadylist[i].isToday == this.data.dateArr[j].isToday)
          // this.data.dateArr[j].isColor=true
          copy[j].isColor = true
        // console.log(copy[j].isToday)
      }
    }
    this.setData({
      dateArr: copy
    })
  },
  sign_in() {
    if (this.data.isQianDao == true) {
      wx.showToast({
        title: '您今日已经签到，请勿重复签到',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });

    }
    else {
      wx.showLoading({
        title: "签到中",
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
      this.setData({
        isQianDao: true,
        content: "今日已签到",
        nowdaycolor: "nowDay"
      })
      wx.hideLoading();

      db.collection("index3_qiandao_daily").add({
        data: {
          year: this.data.year,
          month: this.data.month,
          date: new Date().getDate(),
          nowdaycolor: "nowDay",
          isToday: this.data.isToday,
          isColor: true,
          isQianDao: true
        }
      }).then(res => {
        console.log(res);
      })

      this.getData();
    }
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                        //需要遍历的日历数组数据
    let arrLen = 0;                            //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();
    //let startWeek = new Date(year, (month + 1), 1).getDay()  ;                        //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5,
          isColor: false

        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
    this.getData();
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
    this.getData();
  }

})