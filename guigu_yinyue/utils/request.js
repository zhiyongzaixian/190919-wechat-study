// 封装发送ajax请求的方法
import config from './config'
export default (url, data={}, method='GET') => {
  return new Promise((resolve, reject) =>{
    // 执行异步任务
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (res) => {
        // console.log(res);
        // 修改promise对象的状态为成功状态，同时将数据返回
        resolve(res.data)
      },
      fail: (error) =>{
       //console.log(error);
        reject(error);
      }
    });
  });
 
}
