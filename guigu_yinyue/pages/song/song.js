// pages/song/song.js
import PubSub from 'pubsub-js'
import request from "../../utils/request";

// 获取全局app的实例
let appInstance = getApp();
console.log('全局实例： appInstance', appInstance.globalData);


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
  
    // 判断 当前页面 音乐 是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      // 修改当前页面的播放状态
      this.setData({
        isPlay: true
      })
    }
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
  
  
    // 监听音乐的播放/暂停/停止
    this.backgroundAudioManager.onPause(() => {
      console.log('音乐暂停了');
      this.setData({
        isPlay: false
      })
      
      appInstance.globalData.isMusicPlay = false;
    })
  
    this.backgroundAudioManager.onStop(() => {
      console.log('音乐停止');
      this.setData({
        isPlay: false
      })
    
      appInstance.globalData.isMusicPlay = false;
    })
  
    this.backgroundAudioManager.onPlay(() => {
      console.log('音乐播放');
      this.setData({
        isPlay: true
      })
  
      appInstance.globalData.isMusicPlay = true;
    })
  
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
  
  
    // 订阅消息获取对应的音乐id
    // 放在onload中订阅解决订阅多次的问题
    // PubSub.subscribe('musicId', async (msg, musicId) => {
    //   console.log('recommend页面发送过来的音乐id: ', musicId);
    //   // 获取音乐信息
    //   // 获取音乐的详细信息
    //   let songData = await request('/song/detail', {ids: musicId});
    //   console.log(songData);
    //   this.setData({
    //     song: songData.songs[0],
    //     musicId
    //   })
    //
    //   //  更新窗口的标题
    //   wx.setNavigationBarTitle({
    //     title: this.data.song.name
    //   })
    //   // 播放音乐
    //   this.musicControl(true, musicId);
    // })
    
    
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
      // this.backgroundAudioManager = wx.getBackgroundAudioManager();
      // backgroundAudioManager.src = '音乐链接'
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
      
      
      // 声明音乐在播放
      this.isSwitch = false;
      
      // 修改全局的播放状态
      appInstance.globalData.musicId = musicId;
      appInstance.globalData.isMusicPlay = true;
      
    }else { // 暂停
      this.backgroundAudioManager.pause();
  
      // 修改全局的播放状态
      // appInstance.globalData.musicId = musicId;
      appInstance.globalData.isMusicPlay = false;
    }
    this.setData({
      isPlay
    })
  },
  
  
  // 切换歌曲的事件回调
  switchSong(event){
    // 判断音乐是否在正常播放
    if(this.isSwitch){ // 正在切换
      return
    }
    console.log('可以切换');
    this.isSwitch = true;
    
    let type = event.currentTarget.dataset.type;
    console.log(type);
    // 关闭上一首音乐播放的状态
    this.setData({
      isPlay: false
    })
    // 停止音乐播放
    this.backgroundAudioManager.stop();
    
    this.handleSwitchSong(type);
  },

  
  // 封装切换歌曲的方法
  handleSwitchSong(type){
    // 两个页面如何通信： PubSub 消息的订阅发布
    
    // 1. 将要切换的类型（上一首 || 下一首）的信号发给recommendList
    PubSub.publish('switchType', type);
    
    // 订阅消息获取对应的音乐id
    PubSub.subscribe('musicId', async (msg, musicId) => {
      console.log('recommend页面发送过来的音乐id: ', musicId);
      // 获取音乐信息
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
      // 播放音乐
      this.musicControl(true, musicId);
      
      // 取消当前订阅
      PubSub.unsubscribe('musicId');
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
