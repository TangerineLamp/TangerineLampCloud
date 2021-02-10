// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    slides: [
      { url: 'http://p1.music.126.net/3iGnkiIwi5-Aa56TVg_Zww==/109951165678592787.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/H5DfakDPIQHoAKbQ5XC3Fg==/109951165679165117.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/n3VNGm9bW12JUkg1QEUy3A==/109951165679781345.jpg?imageView&quality=89' },
      { url: 'http://p1.music.126.net/qyGARhouAcu4s-IqKyXURw==/109951165679120218.jpg?imageView&quality=89' }
    ],
    item: 0,
    tab: 0,
    // 播放列表数据
    playlist: [{
      id: 1,
      title: '起风了',
      singer: '吴青峰 - 《加油，你是最棒的》主题曲',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music1.mp3',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/b1899d500dda5db2da11df3efc89cba6/cd14cd06952e28d46932975798f5b904/c0c269244d5c7f8d52e80480f3581052'
    }, 
    {
      id: 2,
      title: 'TimeAfterTime-花舞う街で-',
      singer: '仓木麻衣 - 《名侦探柯南-迷宫的十字路口》',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music2.mp3',
      coverImgUrl: 'https://p3.music.126.net/XbDlX1f7r0cgY42O2yyoaw==/109951163049831563.jpg?param=300y300'
    }, 
    {
      id: 3,
      title: '成都',
      singer: '赵雷 - 成都',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music3.mp3',
      coverImgUrl: 'https://p3.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'
    }, 
    {
      id: 4,
      title: 'Five Hundred Miles',
      singer: 'Stark Sands,Carey Mulligan,Justin Timberlake 电影《醉乡民谣》插曲',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music4.mp3',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/2d89e1a347eac64744e3c58e3890c5eb/f821406fe35639f0f43c1d8b99449c4f'
    },
    {
      id: 5,
      title: '纸短情长',
      singer: '烟把儿 - 纸短情长',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music5.mp3',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/1742b689b7eafcb8c647639d4fd1eba3/6b78d7d40b5e0fd532060f0a9b7c6322'
    },
    {
      id: 6,
      title: '莫扎特C大调K.265/300e 小星星变奏曲',
      singer: 'Various Artists',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music6.mp3',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/193a5da7dc388408ef0a27e080d901e2/a89fa4de781d47c26ae8620f4ab7d58d'
    },
    {
      id: 7,
      title: '光の旋律',
      singer: 'Kalafina - 《空の音》主题曲',
      src: 'cloud://tangerine-cloud-5g4h71uo73fc1edb.7461-tangerine-cloud-5g4h71uo73fc1edb-1304921980/index0/music/music7.mp3',
      coverImgUrl: 'https://p3.music.126.net/FE6EgJVto9hkiYNKMMyAMA==/109951163576996866.jpg?param=300y300'
    }
  ],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3812393301,2329645096&fm=26&gp=0.jpg',
    }
  },

  // 轮播图
  

  // 实现播放器播放功能
  audioCtx: null,
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
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
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
  }
})

