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
    // 获取视频导航标签列表数据
    let videoGroupListData = await request('/video/group/list');
    console.log(videoGroupListData);
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
    
    
    
    // 获取对应标签下的视频列表数据
    let videoListData = await request('/video/group', {id: this.data.navId});
    console.log(videoListData);
    this.setData({
      videoList: videoListData.datas
    })
  },
  
  
  changeNavId(event){
    // console.log(event.currentTarget.dataset.navid);
    this.setData({
      navId: event.currentTarget.dataset.navid
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
