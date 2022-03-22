const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    docId: "",
    capableDate: [],
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    standardTime: 0,
    isTodayWeek: false,
    todayIndex: 0,
    picList:["cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/logo/左.png",
    "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/logo/右.png"]
  },
  onLoad: function (options) {
    let docId = options.docId;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      docId: docId,
      year: year,
      month: month,
      isToday: '' + year + '/' + month + '/' + now.getDate(),
      standardTime: '' + year + '/' + month + '/' + now.getDate()
    })
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
    let dayNums = new Date(year, nextMonth, 0).getDate();              //获取目标月有多少天
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
          isToday: '' + year + '/' + (month + 1) + '/' + num,
          standardTime: '' + year + '/' + (month + 1) + '/' + num,
          dateNum: num,
          weight: 5
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
  },

  //导航至详情页
  navToDetail(e) {
    //得进行判断，如果传入的时间戳大于今日1-7天，就可以跳转具体页面（字符串比较）
    //不然显示请提前一天预约 
    console.log(e.currentTarget.dataset)
    var Today = e.currentTarget.dataset.date
    var time = e.currentTarget.dataset.standardtime
    console.log(Today)
    console.log(time)
    var newToday = new Date(Today)
    var newtime = new Date(time)
    console.log(newToday)
    console.log(newtime)
    // console.log("返回时间：" + newtime);
    var timeToday = Date.parse(newToday);
    var timeBindtap = Date.parse(newtime);
    console.log("返回今日时间戳：" + timeToday)
    console.log("返回点击时间戳：" + timeBindtap)

    if (timeBindtap - timeToday < 2 * 86400000) {
      wx.showToast({
        title: '请选择2天之后的日期',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
        success: (result) => {
            console.log("预约失败")
        },
        fail: () => { },
        complete: () => { }
      });

    }
    else if (timeBindtap - timeToday > 16 * 86400000) {
      wx.showToast({
        title: '请选择16天之内的日期',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: false,
        success: (result) => {
          console.log("预约失败")
        },
        fail: () => { },
        complete: () => { }
      });

    }
    else {
      wx.navigateTo({
        url: '/pages/index3/adjustAdviceTime_open/hoursChoose/hoursChoose?_futureDay='+time+"&docId="+this.data.docId,
        success: (result) => {
          console.log("进入预约界面")
        },
        fail: () => { },
        complete: () => { }



        //下面填写是否预约
        //如果预约将数据加入数据库，并且显示预约成功
      });
    }



  }


})