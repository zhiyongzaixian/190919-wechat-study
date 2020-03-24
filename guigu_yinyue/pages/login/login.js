// pages/login/login.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 失去焦点，收集表单项数据
  handleBlur(event){
    console.log('失去焦点');
    console.log(event.detail.value);
    console.log(event);
    
    let type = event.currentTarget.dataset.type;
    // 更新状态
    this.setData({
      [type]: event.detail.value
    })
  },
  
  async login(){
    // 1. 获取用户表单相数据
    let {phone, password} = this.data;
    // 2. 前端验证
    if(!phone || !password){
      console.log('用户名/密码错误');
  
      wx.showToast({
        title: '登录失败',
        icon: 'loading'
      })
      return;
    }
    
    // 3. 发送请求进行后端验证
    let loginData = await request(`/login/cellphone`, {phone, password})
    if(loginData.code === 200){
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      // 1. 将用户登录成功的数据缓存至本地
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(loginData)
      })
      
      // 2. 跳转至个人中心页
      // redirectTo && navigateTo不能跳转至tabBar页面
      wx.switchTab({
        url: '/pages/personal/personal'
      })
      
      
      
    }else {
      wx.showToast({
        title: '登录失败',
        icon: 'loading'
      })
    }
    console.log(loginData);
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
