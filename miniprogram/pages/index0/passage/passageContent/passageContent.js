// pages/freeTestDetail/freeTestDetail.js

const db = wx.cloud.database();

// 收藏：默认未收藏
let isCollected = false;
let _id = ''


Page({

  /**
   * 页面的初始数据
   */
  data: {
    passage:{},
    // 默认是未收藏
    collect_img_src:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-icon.png",
    collect_text:"收藏"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _id = options._id
    wx.showLoading({
      title: '加载中',
    })
    this.getPassage(_id);
    wx.hideLoading();
    console.log(options)
  },

  // 获取文章内容
  getPassage(_id) {
    var that = this;
    // 文章使用长图模式展示，从passageLongPicture集合获取，数据库模式从passage集合获取
    db.collection("index0_passageLongPicture").doc(_id).get().then(res=>{
      isCollected = res.data.isCollected
      that.setData({
        passage:res.data,
        collect_img_src: isCollected ? "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-active-icon.png" : "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-icon.png"
      })
      // 从index0_passageCollect获取个人收藏文章记录
      db.collection("index0_passageCollect").where({
        passage_id:_id,
        isCollected:true
      }).count().then(res=>{
        if(res.total>0){
          isCollected = true
          that.setData({
            collect_img_src:"cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-active-icon.png"
          })
        }
      })
    })
  },

  // 收藏按钮
  collectClick() {
    this.setData({
      // 已收藏，再点一下取消收藏；未收藏，点击收藏
      collect_img_src: isCollected ? "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-icon.png" : "cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/passage-longPicture/icon/collect-active-icon.png"
    })
    isCollected = !isCollected
    // 收藏状态更新至index0_passageCollect
    db.collection("index0_passageCollect").where({
      passage_id: _id
    }).count().then(res=>{
      // 已有该用户在该文章下的收藏记录
      console.log(res)
      if(res.total>0){
        db.collection("index0_passageCollect").where({
          passage_id: _id
        }).update({
          data:{
            isCollected: isCollected
          }
        }).then(res=>{
          console.log("改变收藏状态成功")
        })
      }else{  // 该用户之前未收藏过该文章
        var passage = this.data.passage;
        db.collection("index0_passageCollect").add({
          data:{
            passage_id: _id,
            isCollected: isCollected,
            author: passage.author,
            introImage: passage.introImage,
            title: passage.title,
            pushTime: passage.pushTime
          }
        }).then(res=>{
          console.log("改变收藏状态成功")
        })
      }
    })
  },


})