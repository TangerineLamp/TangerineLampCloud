// miniprogram/pages/index1/test1/testlists/pcl-5/pcl-5.js
const db = wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalScores:0,
    // totalScores:10,
    totalColor: "",
    Parts_Scores:[], //各部分分数
    final_eval_str: "", // 最终测评结果字符串
    // final_eval_str: "有极轻微PSTD症状，可自行观察一段时间，或向心理医师寻求建议。",
    // Parts_Scores:[["入侵症状",1,"症状轻微"],["持续回避",2,"中等症状"],["认知、情绪消极改变",3,"症状较严重"],["情绪激动",4,"症状严重"]],    // *****
    Parts_numbers:[[1,2,3,4,5], [6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20]],  //各部分题目序号
    Parts_meanings: ["入侵症状","持续回避","认知和情绪消极改变","情绪激动"],  //各部分分数含义
    showCalculation:false,
    // showCalculation:true,      // *****
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
        this.calculate();
        this.setData({
          showCalculation:true
        })
        // ↓ ********* 保存分析结果到数据库 ********* ↓
        let testName = "创伤后应激障碍筛查量表PCL-5";
        let totalScores = this.data.totalScores;
        let partScores = [];
        let advice = this.data.final_eval_str;
        let date = Date.now();
        let totalColor = this.data.totalColor;
        for(var i=0;i<this.data.Parts_Scores.length;i++){
          partScores.push(String(this.data.Parts_Scores[i][0]+"："+this.data.Parts_Scores[i][1]+"分（"+this.data.Parts_Scores[i][2]+"）；"))
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
    let Parts_Scores_tmp = new Array(this.data.Parts_numbers.length).fill(0);    //根据各部分总数创建各部分的scores数组
    let final_eval_str = "";
    let totalColor = "";
    for(var i=1;i<=20;i++){                     //计算各部分得分
      for(var j=0;j<4;j++){
        if(this.data.Parts_numbers[j].indexOf(i)>=0){
          Parts_Scores_tmp[j] += this.data.chosenAnswers[i];
          break;
        }
      }
      totalScores += this.data.chosenAnswers[i];
    }
    if(totalScores==0){
      final_eval_str = "恭喜，本次测评未发现PTSD症状！";
      totalColor = "green";
    }else if(totalScores < 19){
      final_eval_str = "有极轻微PSTD症状，可自行观察一段时间，或向心理医师寻求建议。";
      totalColor = "blue";
    }else if(totalScores < 38){
      final_eval_str = "有轻微PSTD症状，可自行观察一段时间，或向心理医师寻求建议。";
      totalColor = "orange";
    }else{
      final_eval_str = "有较严重PSTD症状，请立即向心理咨询师寻求帮助！";
      totalColor = "red";
    }

    //根据各部分得分分析结果
    let Parts_Eva_tmp = [];
    let tmpstr = "";
    let Parts_meanings = this.data.Parts_meanings;
    for(var i=0;i<this.data.Parts_numbers.length;i++){
      if(Parts_Scores_tmp[i]/this.data.Parts_numbers[i].length<1){
        tmpstr = "无明显症状";
      }else if (Parts_Scores_tmp[i]/this.data.Parts_numbers[i].length<2){
        tmpstr = "症状轻微";
      }else if (Parts_Scores_tmp[i]/this.data.Parts_numbers[i].length<3){
        tmpstr = "中等症状";
      }else if (Parts_Scores_tmp[i]/this.data.Parts_numbers[i].length<4){
        tmpstr = "症状较严重";
      }else{
        tmpstr = "症状严重";
      }
      Parts_Eva_tmp.push(tmpstr);
    }
    let Parts_Scores = [];
    for(var i=0;i<this.data.Parts_numbers.length;i++){
      Parts_Scores.push([Parts_meanings[i],Parts_Scores_tmp[i],Parts_Eva_tmp[i]])
    }

    this.setData({
      Parts_Scores,
      totalScores,
      final_eval_str,
      totalColor
    })
  },

  navback(){
    wx.navigateBack({
      delta: 2,
    })
  },

})