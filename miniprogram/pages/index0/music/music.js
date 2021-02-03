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
      src: 'http://freetyst.nf.migu.cn/public/product8th/product38/2020/02/2022/2019%E5%B9%B401%E6%9C%8810%E6%97%A513%E7%82%B937%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E9%9F%B3%E9%BC%8E%E5%A4%A92%E9%A6%96/%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC/Mp3_64_22_16/63388702536.mp3?channelid=03&k=61f29b36c2feb5d4&t=1612091399&msisdn=b0ce1e49-d1d1-40be-ad3b-0d24120ad474',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/b1899d500dda5db2da11df3efc89cba6/cd14cd06952e28d46932975798f5b904/c0c269244d5c7f8d52e80480f3581052'
    }, 
    {
      id: 2,
      title: 'TimeAfterTime-花舞う街で-',
      singer: '仓木麻衣 - 《名侦探柯南-迷宫的十字路口》',
      src: 'https://m8.music.126.net/20210131205434/b1c83ddff6792f0b7f28377fb27540cd/ymusic/d55d/2230/85d2/70528193634799ac251c4be2fe71d08a.mp3',
      coverImgUrl: 'https://p3.music.126.net/XbDlX1f7r0cgY42O2yyoaw==/109951163049831563.jpg?param=300y300'
    }, 
    {
      id: 3,
      title: '成都',
      singer: '赵雷 - 成都',
      src: 'https://m7.music.126.net/20210131205214/8c583b4ebab5b82c1d931736eb3b8d85/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3058353562/b3f5/c60c/2c1e/5af571f454b5e60a050725ffb8c7edf0.mp3',
      coverImgUrl: 'https://p3.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'
    }, 
    {
      id: 4,
      title: 'Five Hundred Miles',
      singer: 'Stark Sands,Carey Mulligan,Justin Timberlake 电影《醉乡民谣》插曲',
      src: 'http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=LQ&netType=00&copyrightId=0&contentId=600910000008536813&resourceType=2&channel=0',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/2d89e1a347eac64744e3c58e3890c5eb/f821406fe35639f0f43c1d8b99449c4f'
    },
    {
      id: 5,
      title: '纸短情长',
      singer: '刘艺佳 - 纸短情长',
      src: 'http://freetyst.nf.migu.cn/public/product10/2018/05/31/2018%E5%B9%B405%E6%9C%8828%E6%97%A517%E7%82%B927%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%B5%A9%E4%B8%98%E7%A7%91%E6%8A%801%E9%A6%96/%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC/Mp3_64_22_16/%E7%BA%B8%E7%9F%AD%E6%83%85%E9%95%BF-%E5%88%98%E8%89%BA%E4%BD%B3.mp3?channelid=03&k=95375139427c527b&t=1612103837&msisdn=50783766-93c3-42b5-a43a-da030d3f8378',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/1742b689b7eafcb8c647639d4fd1eba3/6b78d7d40b5e0fd532060f0a9b7c6322'
    },
    {
      id: 6,
      title: '莫扎特C大调K.265/300e 小星星变奏曲',
      singer: 'Various Artists',
      src: 'http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=LQ&netType=00&copyrightId=0&contentId=600908000009515801&resourceType=2&channel=0',
      coverImgUrl: 'http://d.musicapp.migu.cn/prod/file-service/file-down/8121e8df41a5c12f48b69aea89b71dab/193a5da7dc388408ef0a27e080d901e2/a89fa4de781d47c26ae8620f4ab7d58d'
    },
    {
      id: 7,
      title: '光の旋律',
      singer: 'Kalafina - 《空の音》主题曲',
      src: 'https://m8.music.126.net/20210131213142/33d7e4a0c153835725a6c49fcc6478f0/ymusic/047e/9c9d/db69/ebda3256548444ba0ea7ed7fe88def87.mp3',
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

