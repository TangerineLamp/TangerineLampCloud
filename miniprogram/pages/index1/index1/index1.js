Page({
  data: {
    currentIndex:0,
    scrollTop:0,
    leftMenuList:["专业测评","娱乐测评"],
    rightTestList:[],
  },

  newListPaid:[
    {
      tid:6,
      title:"专业触底加载1",
      img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1622435809,957750092&fm=15&gp=0.jpg",
      type:"能力",
      des:"溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试"
    },
    {
      tid:7,
      title:"专业触底加载2",
      img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=395487156,3062274823&fm=26&gp=0.jpg",
      type:"情感",
      des:"测测你是哪种恋爱体质？"
    },
    {
      tid:8,
      title:"专业触底加载3",
      img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3840350717,2210481427&fm=26&gp=0.jpg",
      type:"情感",
      des:"从颜色透视你的爱情观"
    }
  ],

  newListFree:[
    {
      tid:6,
      title:"娱乐触底加载1",
      img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1622435809,957750092&fm=15&gp=0.jpg",
      type:"能力",
      des:"溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试"
    },
    {
      tid:7,
      title:"娱乐触底加载2",
      img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=395487156,3062274823&fm=26&gp=0.jpg",
      type:"情感",
      des:"测测你是哪种恋爱体质？"
    },
    {
      tid:8,
      title:"娱乐触底加载3",
      img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3840350717,2210481427&fm=26&gp=0.jpg",
      type:"情感",
      des:"从颜色透视你的爱情观"
    }
  ],

  //从云端获取的数据
  Cates:{
    testList:[
      [
        {
          tid:0,
          title:"童年阴影测试",
          img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3812393301,2329645096&fm=26&gp=0.jpg",
          type:"情感",
          des:"童年受到的伤害，改变了你什么？"
        },
        {
          tid:1,
          title:"抑郁测试",
          img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=405757228,3196131689&fm=26&gp=0.jpg",
          type:"健康",
          des:"测测你的抑郁有多深？"
        },
        {
          tid:2,
          title:"影子人格测试",
          img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=333358049,3511313393&fm=26&gp=0.jpg",
          type:"性格",
          des:"你的背后隐藏着哪些影子人格？"
        },
        {
          tid:3,
          title:"大脑优势评估",
          img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1622435809,957750092&fm=15&gp=0.jpg",
          type:"能力",
          des:"溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试"
        },
        {
          tid:4,
          title:"恋爱体质测试",
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=395487156,3062274823&fm=26&gp=0.jpg",
          type:"情感",
          des:"测测你是哪种恋爱体质？"
        },
        {
          tid:5,
          title:"爱情底色测试",
          img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3840350717,2210481427&fm=26&gp=0.jpg",
          type:"情感",
          des:"从颜色透视你的爱情观"
        },
        {
          tid:3,
          title:"大脑优势评估",
          img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1622435809,957750092&fm=15&gp=0.jpg",
          type:"能力",
          des:"溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试溢出测试"
        },
        {
          tid:4,
          title:"恋爱体质测试",
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=395487156,3062274823&fm=26&gp=0.jpg",
          type:"情感",
          des:"测测你是哪种恋爱体质？"
        },
        {
          tid:5,
          title:"爱情底色测试",
          img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3840350717,2210481427&fm=26&gp=0.jpg",
          type:"情感",
          des:"从颜色透视你的爱情观"
        }
      ],
      [
        {
          tid:500,
          title:"假面人格测试",
          img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4112329300,1871547202&fm=26&gp=0.jpg",
          type:"人际",
          des:"测测你隐藏了哪些人格？"
        },
        {
          tid:501,
          title:"原生家庭边界评估",
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1060753041,4225328984&fm=26&gp=0.jpg",
          type:"亲子",
          des:"父母缺乏边界感，该怎么办？"
        },
        {
          tid:500,
          title:"假面人格测试",
          img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4112329300,1871547202&fm=26&gp=0.jpg",
          type:"人际",
          des:"测测你隐藏了哪些人格？"
        },
        {
          tid:501,
          title:"原生家庭边界评估",
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1060753041,4225328984&fm=26&gp=0.jpg",
          type:"亲子",
          des:"父母缺乏边界感，该怎么办？"
        },
        {
          tid:500,
          title:"假面人格测试",
          img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4112329300,1871547202&fm=26&gp=0.jpg",
          type:"人际",
          des:"测测你隐藏了哪些人格？"
        },
        {
          tid:501,
          title:"原生家庭边界评估",
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1060753041,4225328984&fm=26&gp=0.jpg",
          type:"亲子",
          des:"父母缺乏边界感，该怎么办？"
        }
      ]
    ]
  },

  //首次加载页面时，调用onload
  onLoad: function(options){
    wx.showLoading({
      title: '加载中',
    })
    this.getCates();
    wx.hideLoading();
  },

  //接口返回的数据
  getCates(){
    let right = this.Cates.testList[0];
    this.setData({
      rightTestList:right
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bottomRefresh: function () {
    let oldData = this.data.rightTestList;
    let newList = [];
    if(this.data.currentIndex==0){
      newList = this.newListPaid;
    }else{
      newList = this.newListFree;
    }
    let newData = oldData.concat(newList);
    this.setData({
      rightTestList:newData
    })
  },
  
  //导航至词条检索
  bindViewTap1() {
    wx.navigateTo({
      url: "/pages/index1/words/wordsIndex/wordsIndex"
    })
  },
  //导航至心理咨询
  bindViewTap2() {
    // wx.navigateTo({
    //   url: "/pages/index1/advice/adviceIndex/adviceiIndex"
    // })  
    wx.showToast({
      title: '敬请期待', //弹框内容
      icon: 'success',  //弹框模式
      duration: 1000    //弹框显示时间
    })
  },
  //导航至心理课程
  bindViewTap3() {
    wx.navigateTo({
      url: "/pages/index1/course/courseIndex/courseIndex"
    })
  },

  //左侧菜单点击事件,重新渲染右侧列表
  switchRightTab(e){
    const {index}=e.currentTarget.dataset;
    let right = this.Cates.testList[index];
    this.setData({
      currentIndex:index,
      rightTestList:right,
      //重新设置，右侧内容的scroll-view标签距离顶部的距离
      scrollTop:0
    })
  },


})  