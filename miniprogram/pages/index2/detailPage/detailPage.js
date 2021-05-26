const db = wx.cloud.database()

Page({
  data: {
    headImg: "", // 头像
    likeCount: 0, // 喜欢的数量
    hostNickname: "", // 树洞主人昵称
    hostPostTime: "", //  树洞主人发布时间
    aritleDetail: "", //  树洞详细内容
    isAnonymous: true, //  匿名
    time: 0,  //  发布时间
    comments: [],
  },

  onLoad(options){
    let treeHoleID = options.title
    db.collection("index2_treeholes")
    .doc(treeHoleID)
    .get()
    .then(res=>{
      console.log("树洞的详细内容:",res.data)
      this.setData({
        headImg: res.data.avatar,
        likeCount: res.data.goodCount,
        hostNickname: res.data.nickName,
        hostPostTime: res.data.time,
        aritleDetail: res.data.mainBody,
        isAnonymous: res.data.isAnonymous,
        time: res.data.time,
      })
    })
  }
})