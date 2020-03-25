// pages/song/song.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 标识音乐是否播放， 默认为未播放
    song: {},
    musicId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('options: ', options);
    // console.log(options.song);
    // console.log(typeof options.song);
    // let song = JSON.parse(options.song);
    // options是收集路由参数的对象， 默认是空对象
    
    // 获取音乐id
    let musicId = options.musicId;
    // 获取音乐的详细信息
    let songData = await request('/song/detail', {ids: musicId});
    console.log(songData);
    this.setData({
      song: songData.songs[0],
      musicId
    })
    
    //  更新窗口的标题
    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
    
  },
  // 控制音乐播放
  playControl(){
    // let isPlay = !this.data.isPlay;
    let {isPlay, musicId} = this.data;
    
    
    this.musicControl(!isPlay, musicId)
  },
  
  // 播放音乐播放/暂停功能
  async musicControl(isPlay, musicId){
    if(isPlay){ // 播放
      
      // 通过音乐id获取对应的播放url地址
      let musicLinkData = await request('/song/url', {id: musicId});
      let musicLink = musicLinkData.data[0].url;
      this.backgroundAudioManager = wx.getBackgroundAudioManager();
      // backgroundAudioManager.src = '音乐链接'
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
    }else { // 暂停
      this.backgroundAudioManager.pause();
    }
    
    
    this.setData({
      isPlay
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
