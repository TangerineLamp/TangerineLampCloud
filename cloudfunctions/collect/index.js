// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext();//目的：获取_openid
  return await cloud.database().collection("index0_passageLongPicture").doc(event.id).update({
    data:{
      isCollected: event.isCollected,
      // _openid: wxContext.OPENID,
    }
  })
  .then(res => {
    console.log("收藏状态改变成功", res)
    return res
  })
  .catch(res => {
    console.log("收藏状态改变失败", res)
    return res
  })
}
