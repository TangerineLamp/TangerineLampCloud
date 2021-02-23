const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    isDeveloper:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initOpenID();
  },

  getOpenID: async function() {
    if (this.openid) {
      return this.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
    })

    return result.openid
  },

  async try(fn, title) {
    try {
      await fn()
    } catch (e) {
      this.showError(title, e)
    }
  },

  async initOpenID() {
    return this.try(async () => {
      const openId = await this.getOpenID()

      this.getAuthority(openId);

      this.setData({
        openId,
      })
    }, '初始化 openId 失败')
  },

  getAuthority(openId){
    db.collection("developer").where({
      developer:openId
    }).count().then(res=>{
      if(res.total>0){
        this.setData({
          isDeveloper:true
        })
      }
    })
  }

})