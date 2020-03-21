// pages/index/index.js
// 注册当前页面实例
Page({

  /**
   * 页面的初始数据 并没有实现数据劫持代理
   */
  data: {
    msg: '初始化的数据',
    userInfo: {}
  },

  handleParent(){
    console.log('parent');
  },
  handleChild() {
    console.log('child');
  },
  // 跳转至logs页面
  toLogs(){
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  },


  handleGetUserInfo(res){
    if(res.detail.userInfo && !this.data.userInfo.nickName){
      console.log('点击了。。。', res)
      // console.log(res.detail.userInfo);
      // 更新userInfo的状态数据
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger;
    console.log('onLoad');

    // 获取用户信息
    wx.getUserInfo({ // 必须是用户授权之后
      success: (res) => {
        console.log('获取用户信息成功： ', res.userInfo)
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }
    })












    // React: this.setState() 1. 在自己的钩子函数(componentDidMount)中是异步的，2. 在非自身钩子函数中是同步的，如： 定时器的回调
    // Vue: this.xxx = value; 数据劫持，代理
    // 小程序中： this.setData({})
    // console.log(this.msg) // 
    // console.log(this.data.msg) // 
    // // this.data.msg = '修改之后的数据';

    // // 同步修改， 异步更新渲染
    // // why? 降低页面渲染的次数，提高性能
    // this.setData({
    //   msg: '修改之后的数据'
    // })
    // console.log(this.data.msg);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');

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