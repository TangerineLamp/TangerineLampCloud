// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 获得基本的树洞数据库
  data = db.collection("doctors").doc(event.openid).get()
  return data.isCertification
}