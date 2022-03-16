// pages/index/index.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    slides: [
      { url: 'cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/swiper/1.jpg' },
      { url: 'cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/swiper/2.jpg' },
      { url: 'cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/swiper/3.jpg' }
    ],
    item: 0,
    tab: 0,
    // 播放列表数据
    // playlist: [],
    playlist: [{
      id: -1,
      title: '请点击选择播放音乐',
      singer: 'Please choose a song',
      src: '',
      coverImgUrl: 'cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/music/icon/music-default-icon.jpg'
    }], 
    state: 'paused',
    playIndex: 0,
    // 默认设置
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '请点击选择播放音乐',
      singer: 'Please choose a song',
      coverImgUrl: 'cloud://tangerine-cloud-9grdz5e80159e7b3.7461-tangerine-cloud-9grdz5e80159e7b3-1304921980/index0/music/icon/music-default-icon.jpg',
      src: ''
    }
  },

  audioCtx: null,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    this.getPlayList();
    wx.hideLoading();
  },

  // 获取音乐列表
  getPlayList() {
    // 降序，越新的音乐排在越前面
    db.collection("index0_music").orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        playlist:res.data
      })
    })
  },

  // 页面从前台变为后台时执行
  onHide: function() {
    this.audioCtx = wx.createInnerAudioContext()
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },

  onUnload: function() {
    // 页面销毁时执行
    // 离开页面必须停止播放音乐
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },

  // 实现播放器播放功能
  // 页面首次渲染完毕时执行
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    // 默认选择第1曲
    this.setMusic(0)
    var that = this
    // 播放进度检测
    this.audioCtx.onError(function() {
      console.log('播放失败：' + that.audioCtx.src)
    })
    // 播放完成自动换下一曲
    this.audioCtx.onEnded(function() {
      that.next()
    })
    // 自动更新播放进度
    this.audioCtx.onPlay(function() {})
    this.audioCtx.onTimeUpdate(function() {
      that.setData({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    // 格式化时间
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
  },

  // 音乐播放
  setMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    // if(music.src != undefined) {
    //   this.audioCtx.src = music.src
    // }
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
    // this.audioCtx.src = music.src
  },

  // 播放按钮
  play: function() {
    this.audioCtx.play()
    this.setData({
      state: 'running'
    })
  },

  // 暂停按钮
  pause: function() {
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },

  // 下一曲按钮
  next: function() {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
    // 切换后当前状态为暂停
    // this.setData({
    //   state: 'paused'
    // })
  },
  
  // 滚动条调节歌曲进度
  sliderChange: function(e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },

  // 播放列表换曲功能
  change: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
    // 切换后当前状态为暂停
    // this.setData({
    //   state: 'paused'
    // })
  }
})

