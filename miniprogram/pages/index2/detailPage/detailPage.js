const db = wx.cloud.database()

Page({
  data: {
    headImg: "",
    likeCount: 0,
    hostNickname: "",
    hostPostTime: "",
    aritleDetail: "",
    comments: [],
  },

  onLoad(options){
    let treeHoleID = options.title
    db.collection("index2_treeholes")
    .doc(treeHoleID)
    .get()
    .then(res=>{
      console.log(res)
      let temp = res.detail
      this.setData({
        headImg: temp.avatar,
        likeCount: temp.goodCount,
        hostNickname: temp.nickName,
        hostPostTime: temp.time,
        aritleDetail: mainBody
      })
    })
  }
})