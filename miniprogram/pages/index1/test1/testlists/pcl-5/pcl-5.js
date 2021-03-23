// miniprogram/pages/index1/test1/testlists/pcl-5/pcl-5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentChosen:-1,
    nowIndex:1,
    chosenAnswers:[0], //第0位仅用来占位，真正的index从1开始
    chosenAnswersLength:0,  //已回答问题个数
    questions:[
      "",  //仅用来占位，nowIndex从1开始
      "反复想起过去紧张的经历，苦恼不安，想忘却忘不掉？",
      "过往紧张的经历反复入梦，苦恼不安？",
      "突然感觉或表现得好似过往不好的经历又实实在在地发生了（以为您又真切地回到过去一样）？",
      "当一些事令您想起过往的紧张经历时，感觉心烦意乱？",
      "当一些事令您想起过往的紧张经历时，会产生较强的生理反应（例如心脏怦怦直跳、呼吸困难、出汗） ？",
      "避免与之前紧张的经历有关的记忆、想法和感受？",
      "避免被外部刺激想起之前紧张的经历（例如人、地点、谈话、活动、物件或情境） ",
      "记不起之前紧张经历的重要细节?",
      "对自己、他人或整个世界怀有消极的想法、不信任（例如有以下想 法：我不好、我有严重的问题、没有人值得信任、这个世界危险重重）",
      "因为之前紧张的经历或后面发生的事情责备自己或别人",
      "有强烈的负面情绪，如害怕、恐惧、愤怒、内疚或耻辱？",
      "对之前感兴趣的活动丧失兴趣？",
      "感觉与他人很疏远或断绝了来往？",
      "无法体会积极的情绪（例如，与亲近的人在一起无法感到快乐或无法感受到爱）？",
      "急躁、易怒或有攻击行为？",
      "太冒险，或做可能会给您带来伤害的事情？",
      "“过于戒备”、警惕或提防？",
      "提心吊胆或易受惊吓？",
      "注意力难以集中？",
      "入睡困难或睡不安稳？"
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
      if(this.data.nowIndex===20){     //当前index为最后一个题目，准备跳转到结果分析页面
        console.log("溜溜球")
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

})