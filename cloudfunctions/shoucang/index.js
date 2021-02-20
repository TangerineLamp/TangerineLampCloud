// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// cloud.init({
//   env:cloud.DYNAMIC_CURRENT_ENV
// })

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == 'shoucang') {
    return await cloud.database().collection('homelist')
      .doc(event.id)
      .update({
        data: {
          shoucang: event.shoucang
        }
      })
      .then(res => {
        console.log("改变收藏状态成功", res)
        return res
      })
      .catch(res => {
        console.log("改变收藏状态失败", res)
        return res
      })

  } else if (event.action == 'fabiao') {
    return await cloud.database().collection('homelist')
      .doc(event.id)
      .update({
        data: {
          pinglun: event.pinglun
        }
      })
      .then(res => {
        console.log("发表成功", res)
        return res
      })
      .catch(res => {
        console.log("发表失败", res)
        return res
      })

  }


}