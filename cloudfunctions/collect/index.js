// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();//目的：获取_openid
  return await cloud.database().collection("index0_passageCollect").update({
    data:{
      isCollected: event.isCollected,
      _openid: wxContext.OPENID,
      passage_id: event.id
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
