// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'

import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendList: [], // 每日推荐歌曲
    index: 0, // 音乐的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 验证用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.showLoading({
        title: '请先登录',
        success: () => {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      })
    }
    
    // 日期
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    
    this.setData({
      day, month
    })
    
    
    
    // 获取每日推荐的数据
    let recommendListData = await request('/recommend/songs');
    console.log(recommendListData);
    
    this.setData({
      recommendList: recommendListData.recommend
    })
    
    
    
    
    
    
    // 订阅消息
    PubSub.subscribe('switchType', (msg, type) => {
      console.log(msg, type);
      let {index, recommendList} = this.data;
      if(type === 'pre'){ // 上一首
        // if(index === 0){
        //   index = recommendList.length;
        // }
        //  预处理上边界问题
        (index === 0) && (index = recommendList.length);
        index -=  1;
      }else { // 下一首
        // if(index === recommendList.length - 1){
        //   index = -1;
        // }
        //  预处理下边界问题
        (index === recommendList.length - 1) && (index = -1);
        index += 1;
      }
      
      let musicId = recommendList[index].id;
      // 将音乐musicId发送给song页面，
      PubSub.publish('musicId', musicId);
      this.setData({
        index
      })
      
    })
  },

  
  // 跳转至song页面
  toSong(event){
    // 获取到音乐对象信息
    let {song, index} = event.currentTarget.dataset;
    console.log(song, typeof song);
    
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/songs/pages/song/song?musicId=' + song.id
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
