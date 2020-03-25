// pages/video/video.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: 0, // 视频标签的id标识
    videoList: [], // 视频列表数据
    isTriggered: false, // 标识是否下拉刷新被触发
  },
  
  chooseVideo(){
    // 打开本地摄像头
    wx.chooseVideo({
      maxDuration: 40, // 设置拍摄的最大时长， 最大的时间为60s
    })
  },
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // console.log(wx.getStorageSync('cookies'), '-----------------'); // 如果本地没有存储的数据，获取到的就是空串
    
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
    
    // 获取视频导航标签列表数据
    let videoGroupListData = await request('/video/group/list');
    console.log(videoGroupListData);
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
    
    
    
    wx.showLoading({
      title: '正在加载'
    })
    // 获取对应标签下的视频列表数据
    this.getVideoList(this.data.navId);
  },
  
  
  // 封装获取视频列表的方法
  async getVideoList(navId){
    let videoListData = await request('/video/group', {id: navId});
    // 关闭loading提示框
    wx.hideLoading();
    this.setData({
      videoList: videoListData.datas
    })
  },
  
  
  async changeNavId(event){
    // console.log(event.currentTarget.dataset.navid);
    this.setData({
      navId: event.currentTarget.dataset.navid
    })
  
    wx.showLoading({
      title: '正在加载'
    })
    this.setData({
      videoList: []
    })
  
    this.getVideoList(this.data.navId);
  },

  
  // 下拉刷新
  handleRefresher(){
    console.log('下拉了。。。');
    this.getVideoList(this.data.navId);
    
    // 关闭下拉刷新的状态
    this.setData({
      isTriggered: false
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
    console.log('触发分享');
    
    return {
      title: '这是我自定义的内容',
      page: '/pages/video/video',
      imageUrl: '/static/images/nvsheng.jpg'
    }
  }
})
