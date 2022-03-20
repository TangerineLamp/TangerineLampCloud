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
    Parts_numbers:[[1,4,12,27,40,42,48,49,52,53,56,58], //各部分题目序号
    [3,9,10,28,38,45,46,51,55,65],
    [6,21,34,36,37,41,61,69,73],
    [5,14,15,20,22,26,29,30,31,32,54,71,79],
    [2,17,23,33,39,57,72,78,80,86],
    [11,24,63,67,74,81],
    [13,25,47,50,70,75,82],
    [8,18,43,68,76,83],
    [7,16,35,62,77,84,85,87,88,90],
    [19,44,59,60,64,66,89]
    ],
    Parts_meanings: ["【躯体化】主要反应主观的身体不适感","【强迫症状】反应临床上的强迫症状群","【人际关系敏感】主要指某些个人不自在感和自卑感，尤其是在与他人比较时更加突出","【抑郁】反应与临床上抑郁症状群相联系的广泛的概念","【焦虑】在临床上明显与焦虑症状相联系的精神症状及体验","【敌对】主要是从思维，情感及行为3个方面来反映病人的敌对表现","【恐怖】与传统的恐怖状态或广场恐怖所反应的内容基本一致","【偏执】主要指猜疑和关系妄想等","【精神病性】其中有幻听，思维播散，被洞悉感等反应精神分裂样症状项目","【其他】主要反映睡眠及饮食情况"],  //各部分分数含义
    topicData: [],               // 问题列表，存放问题，需要下拉菜单更新
    isShowResult: false,         // 判断是否显示结果
    isShowSubmit: false,         // 提交按钮，一开始不会显示，只有问题刷新完才会显示
    totalScores: 0                // 最终的得分
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
    db.collection("index1_Scl90TestList")
    .get()
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
    if(oldData.length < maxTopicCount){
      // 显示加载条
      wx.showToast({
        icon: 'loading',
        duration: 500
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
    }
    // 如果现在问题的数量等于问题总数量就显示‘加载完毕’
    else{
      this.setData({
        isShowSubmit: true
      })
    }
  },

  /**
   * 对radio-group改变事件的处理
   * 可以用于对每个问题的每个选项的值进行捕获
   */
  radioChange(e){
    let value = Number(e.detail.value)
    this.data.topicData[parseInt(value / 10) - 1]["gradeValue"] = value % 10
    // console.log(this.data.topicData)
  },

  toSubmit(e){
    wx.showLoading({
      title: '分析中',
    })
    const dataTemp = this.data.topicData
    let totalScores = 0
    let Parts_Scores_tmp = new Array(this.data.Parts_numbers.length).fill(0);    //根据各部分总数创建各部分的scores数组
    let Parts_Scores_factor = new Array(this.data.Parts_numbers.length).fill(0);  //各部分因子
    let factor_cnt = 0  //总因子计数
    let final_eval_str = "";
    let totalColor = "green";
    for(var i=0;i<dataTemp.length;i++){       
      if (dataTemp[i].gradeValue == null | dataTemp[i].gradeValue == ""){
        wx.showToast({
          title: "第"+(i+1)+"题还没有填哦",
          icon: 'none',
          duration: 1000
        })
        return
      }
      for(var j=0;j<this.data.Parts_numbers.length;j++){
        if(this.data.Parts_numbers[j].indexOf(i+1)>=0){
          Parts_Scores_tmp[j] += dataTemp[i]["gradeValue"];
          if(dataTemp[i]["gradeValue"]>2){
            Parts_Scores_factor[j] += 1;
            factor_cnt += 1;
          }
          break;
        }
      }
      totalScores += dataTemp[i]["gradeValue"];
    }
    // —————————————————————— 分析 ——————————————————————
    let part_factor_cnt = false;
    let flag = false;
    for(var i=0;i<Parts_Scores_factor.length;i++){
      if(Parts_Scores_factor[i]>2){
        part_factor_cnt = true;
      }
    }
    if(totalScores>40){
      totalColor = "blue";
    }
    if(totalScores>100){
      totalColor = "orange";
    }
    if(totalScores>160){
      final_eval_str += "总得分超过160；";
      flag = true;
    }
    if(factor_cnt>43){
      final_eval_str += "阳性项目过43项；";
      flag = true;
    }
    if(part_factor_cnt){
      final_eval_str += "某部分阳性因子个数大于2，说明在该种心理问题上存在问题(见部分得分)；";
      flag = true;
    }
    if(flag){
      final_eval_str += "考虑筛查阳性，可向心理医师寻求帮助，做进一步研究。";
      totalColor = "red";
    }else{
      final_eval_str += "暂无明显心理障碍症状，考虑筛查阴性。"
    }

    //根据各部分得分分析结果
    let Parts_Eva_tmp = [];
    let tmpstr = "";
    let Parts_meanings = this.data.Parts_meanings;
    for(var i=0;i<this.data.Parts_numbers.length;i++){
      if(Parts_Scores_tmp[i]*1.0/this.data.Parts_numbers[i].length<0.5){
        tmpstr = "被试自我感觉没有量表中所列的症状";
      }else if (Parts_Scores_tmp[i]*1.0/this.data.Parts_numbers[i].length<1.5){
        tmpstr = "被试感觉有轻微症状,但发生得并不频繁";
      }else if (Parts_Scores_tmp[i]*1.0/this.data.Parts_numbers[i].length<2.5){
        tmpstr = "被试感觉有症状， 其严重程度为轻到中度";
      }else if (Parts_Scores_tmp[i]*1.0/this.data.Parts_numbers[i].length<3.5){
        tmpstr = "被试感觉有症状，其程度为中到严重";
      }else{
        tmpstr = "被试感觉有症状，且症状的频度和强度都十分严重";
      }
      Parts_Eva_tmp.push(tmpstr);
    }
    let Parts_Scores = [];
    for(var i=0;i<this.data.Parts_numbers.length;i++){
      Parts_Scores.push([Parts_meanings[i],Parts_Scores_tmp[i],Parts_Eva_tmp[i],Parts_Scores_factor[i]])
    }

    // —————————————————————— 分析 ——————————————————————
    this.setData({
      totalScores: totalScores,
      final_eval_str:final_eval_str,
      Parts_Scores: Parts_Scores,
      totalColor:totalColor,
      isShowResult: true
    })
    
    wx.hideLoading({
      success: (res) => {},
    })

    // ↓ ********* 保存分析结果到数据库 ********* ↓
    let testName = "心理障碍症状自评量表SCL-90";
    let advice = final_eval_str;
    let date = Date.now();
    let partScores = []
    for(var i=0;i<this.data.Parts_Scores.length;i++){
      partScores.push(String(Parts_Scores[i][0]+"："+Parts_Scores[i][1]+"分 —— "+Parts_Scores[i][2]+"（该部分阳性因子"+Parts_Scores[i][3]+"个）"))
    }
    db.collection("index1_adviceResult").add({
      data:{
        testName:testName,
        totalScores:totalScores,
        partScores:partScores,
        advice:advice,
        date:date,
        totalColor:totalColor,
      }
    }).then(res=>{
      console.log("测评结果添加入数据库")
    })

    // ↑ ********* 保存分析结果到数据库 ********* ↑
  },

  navback(){
    wx.navigateBack({
      delta: 2,
    })
  },
})