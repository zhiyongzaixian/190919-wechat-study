let Koa = require('koa');
let KoaRouter = require('koa-router');
let jwt = require('jsonwebtoken');
let Fly=require("flyio/src/node");
let fly=new Fly;



// 1. 生成 应用
const app = new Koa();
// 2. 生成路由器
const router = new KoaRouter();


// express: req == request 里边包含了所有的请求信息， res == response 里边包含响应信息，同时返回数据也得使用res对象， res.send()
// 5. 注册路由
router.get('/test', (ctx, next) => {
	// ctx： 代替req和res
	
	// koa中返回数据： ctx.body = value
	ctx.body = 'test接口测试返回的数据'
});

let cateNavList = require('./cateNavDatas.json')

// 分类的接口
router.get('/categoryNavList', (ctx, next) => {
	// ctx： 代替req和res
	
	// koa中返回数据： ctx.body = value
	ctx.body = cateNavList;
});




// 获取用户唯一标识openId的
router.get('/getOpenId', async (ctx, next) => {
	// 1) 获取请求参数
	let code = ctx.query.code;
	console.log('浏览器端携带的请求餐数据： code', code);
	let appId = 'wx810e8b1fde386fde'
	let appSecret =  '8dae7e93a191bbc11a4e9395d2901561'
	
	// 2) 发送请求给微信服务器获取用户唯一标识
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
	
	// 3) 发送请求
	let result = await fly.get(url);
	console.log('微信服务器返回的数据: ',  result.data);
	  // .then(function (response) {
	  //   console.log(response);
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	result = JSON.parse(result.data);
	console.log(result);
	console.log(typeof result);
	
	// 4) 自定义登录状态， 对openId进行加密，生成token， jsonwebtoken   jwt
	let openId = result.openid;
	// 5) jsonwebtoken对openid进行加密
	// let token = jwt.sign(data, secret); 生成token， 
	// let data = jwt.verify(token, secret); // 注意： 反编译token的密钥必须和当初生成token的密钥一致
	
	let token = jwt.sign(openId, 'jiajingwen');
	
	// 反编译token练习
	// let test = jwt.verify(token); // 没有密钥： secret or public key must be provided 
	// let test = jwt.verify(token, 'gaolaozhuang'); // 密钥错误：JsonWebTokenError: invalid signature
	let test = jwt.verify(token, 'jiajingwen');
	console.log('反编译token的结果： ', test); 
	ctx.body = token;
});

















// 3. 声明使用路由
app
	.use(router.routes()) // 声明使用路由方法
	.use(router.allowedMethods()) // 允许使用使用路由的方法
	
	
// 4. 监听端口
app.listen('4000', () => {
	console.log('服务器启动成功');
	console.log('服务器地址： http://localhost:4000');
});
