// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannersList: [], // 轮播图的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求
    wx.request({
      url: 'http://localhost:3000/banner',
      data: {
        type: 2
      },
      success: (res) => {
        console.log(res.data);
        // 更新banner的数据
        this.setData({
          bannersList: res.data.banners
        })
      },
      fail: (error) =>{
        console.log(error);
      }
    });
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
