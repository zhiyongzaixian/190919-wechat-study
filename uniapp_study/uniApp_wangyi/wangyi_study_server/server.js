let Koa = require('koa');
let KoaRouter = require('koa-router');


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
router.get('/categoryNavList', (ctx, next) => {
	// ctx： 代替req和res
	
	// koa中返回数据： ctx.body = value
	ctx.body = cateNavList;
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
