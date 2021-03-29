// miniprogram/pages/index1/test1/testlists/phq-9/phq-9.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalScores:0,
    Parts_Scores:[], //各部分分数
    // Parts_numbers:[[1,2,3,4,5], [6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20]],  //各部分题目序号
    Parts_numbers:[[1,2,3,4,5,6,7,8,9]],  //各部分题目序号
    showCalculation:false,
    currentChosen:-1,
    nowIndex:1,
    chosenAnswers:[0], //第0位仅用来占位，真正的index从1开始
    chosenAnswersLength:0,  //已回答问题个数
    questions:[
      "",  //仅用来占位，nowIndex从1开始
      "做任何事都觉得沉闷或者根本不想做任何事",
      "情绪低落、抑郁或绝望",
      "难以入睡，半夜会醒；或相反地，睡觉时间过多",
      "觉得疲倦或活力不足",
      "胃口极差或进食过量",
      "不喜欢自己——觉得自己做得不好，对自己失望或有负家人期望",
      "难以集中精力做事，例如看报纸或看电视 ",
      "其他人反映你行动或说话迟缓；或者相反地，你比平常活动更多——坐立不安、停不下来",
      "想到自己最好去死或者自残"
    ]
  },

  //选择答案
  chooseAnswer(e) {
    let currentChosen = e.currentTarget.dataset.index;
    let chosenAnswersLength = this.data.chosenAnswersLength;
    let nowIndex = this.data.nowIndex;
    let chosenAnswers = this.data.chosenAnswers;
    chosenAnswers[nowIndex] = currentChosen;
    if(nowIndex===chosenAnswersLength+1) chosenAnswersLength++;
    this.setData({
      currentChosen:currentChosen,
      chosenAnswers:chosenAnswers,
      chosenAnswersLength:chosenAnswersLength
    })
  },

  //点击回到上一题
  tapPrev(){
    let prevIndex = this.data.nowIndex-1;
    let prevChoosen = this.data.chosenAnswers[prevIndex];
    this.setData({
      nowIndex:prevIndex,
      currentChosen:prevChoosen
    })
  },

  //点击下一题 or 提交--> 根据nowIndex判断是下一题还是查看结果分析
  tapNext() {
    if(this.data.currentChosen===-1){   //未选择答案，驳回
      wx.showToast({
        title: '请选择一项',
        icon:'none'
      })
    }else{
      if(this.data.nowIndex===9){     //当前index为最后一个题目，准备跳转到结果分析页面
        this.calculate();
        this.setData({
          showCalculation:true
        })
      }else{                           //当前index为中间题目,继续在本页面渲染
        //从未问答过下一题
        if(this.data.nowIndex>=this.data.chosenAnswersLength){
          let nowIndex = this.data.nowIndex;
          this.setData({
            currentChosen:-1,
            nowIndex:nowIndex+1,
          })
        }else{
          // //已经回答过下一题
          let nowIndex = this.data.nowIndex;
          let nextIndex = nowIndex+1;
          let nextChosen = this.data.chosenAnswers[nextIndex];
          this.setData({
            currentChosen:nextChosen,
            nowIndex:nextIndex,
          })
        }
      }
    }
  },

  //计算得分
  calculate(){
    let totalScores = 0;
    let Parts_Scores = new Array(this.data.Parts_numbers.length).fill(0);    //根据各部分总数创建各部分的scores数组
    for(var i=1;i<=9;i++){                     //计算各部分得分
      for(var j=0;j<4;j++){
        if(this.data.Parts_numbers[j].indexOf(i)>=0){
          Parts_Scores[j] += this.data.chosenAnswers[i];
          break;
        }
      }
      totalScores += this.data.chosenAnswers[i];
    }
    this.setData({
      Parts_Scores,
      totalScores
    })
  },

})