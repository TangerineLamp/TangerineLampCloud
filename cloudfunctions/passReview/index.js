
// // 云函数入口函数
// exports.main = async (event, context) => {
//   // const wxContext = cloud.getWXContext()

//   return await cloud.database().collection("doctors").doc(event.id).update({
//     data:{
//       isCertification: event.isCollected,
//       // _openid: wxContext.OPENID,
//     }
//   })
//   .then(res => {
//     console.log("认证状态改变成功", res)
//     return res
//   })
//   .catch(res => {
//     console.log("认证状态改变失败", res)
//     return res
//   })
// }

// 云函数入口文件
const cloud = require('wx-server-sdk')
 
cloud.init()
 
const db = cloud.database()
const _ = db.command
 
// 云函数入口函数
exports.main = async (event, context) => {
 try {
  return await db.collection('doctors').doc('event.id').update({
   // data 传入需要局部更新的数据
   data: {
    isCertification: true,
   }
  })
 } catch (e) {
  console.error(e)
 }
}

