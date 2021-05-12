const db = wx.cloud.database();
var maxTopicCount = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectButton:                // 选项类型列表，存放问题选项
    [
      {value: 1, name: '没有'},
      {value: 2, name: '很轻'},
      {value: 3, name: '中等'},
      {value: 4, name: '偏重'},
      {value: 5, name: '严重'},
    ],
    topicData: [],               // 问题列表，存放问题，需要下拉菜单更新
    isShowResult: false,         // 判断是否显示结果
    isShowSubmit: false,         // 提交按钮，一开始不会显示，只有问题刷新完才会显示
    totalGrade: 0                // 最终的得分
  },

  /**
   * 生命周期函数--监听页面初次加载完成
   */
  onLoad: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.getInitScl90Test()
    this.getMaxCount()
    wx.hideLoading()
  },

  /**
   * 获取题目的总数
   */
  getMaxCount(){
    db.collection("index1_Scl90TestList")
    .count()
    .then(res=>{
      maxTopicCount = res.total
    })
  },

  /**
   * 初始化内容
   * 只能获得最多20个
   */
  getInitScl90Test(){
    db.collection("index1_Scl90TestList").get()
    .then(res => {
      console.log(res)
      this.setData({
        topicData: res.data
      })
    })
  },

  /**
   * 只要触底就进行更新
   * 直至将collection中的问题条目更新完
   * 该内容没有设置limit，一次最高可以更新20个
   */
  onReachBottom: function(){
    let oldData = this.data.topicData;
    // 如果现在问题的数量小于问题总数量就下拉更新
    console.log(oldData.length)
    console.log(oldData)
    if(oldData.length < maxTopicCount){
      // 显示加载条
      wx.showLoading({
        title: '加载中',
      })
      // 开始更新下拉的数据
      db.collection("index1_Scl90TestList")
      .skip(oldData.length)
      .get()
      .then(res=>{
        // 将新问题进行缝合
        let newList = res.data
        let newData = oldData.concat(newList)
        // 缝合好的新老数据传给data中问题列表
        this.setData({
          topicData: newData
        })
      })
      // 加载条关闭
      wx.hideLoading()
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

  /**
   * 对radio-group改变事件的处理
   * 可以用于对每个问题的每个选项的值进行捕获
   */
  radioChange(e){
    let value = Number(e.detail.value)
    console.log(value)
    this.data.topicData[parseInt(value / 10) - 1]["gradeValue"] = value % 10
    // console.log(this.data.topicData)
  },

  toSubmit(e){
    const dataTemp = this.data.topicData
    let res = 0
    for (let i=0;i<dataTemp.length;++i){
      // 如果有未填的部分则告知用户哪里未填
      if (dataTemp[i]["gradeValue"] == ""){
        wx.showToast({
          title: "第"+(i+1)+"题还没有填哦",
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 如果都填了的话就计算总分
      else {
        res += dataTemp[i]["gradeValue"]
      }
    }
    this.setData({
      totalGrade: res,
      isShowResult: true
    })
    console.log(this.data.totalGrade)
    console.log(this.data.isShowResult)
  }
})