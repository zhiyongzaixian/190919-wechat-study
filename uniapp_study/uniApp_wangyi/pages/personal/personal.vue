<template>
	<view>
		<text>个人中心</text>
		
		<button type="primary" @click="getOpenId">获取用户唯一标识</button>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getOpenId(){
				// 1. 通过wx.login()获取登录凭证 code
				wx.login({
					success: async (res) => {
						console.log(res);
						let code = res.code;
						// 2. 将code发送给小程序服务器
						let result = await request('/getOpenId', {code})
					}
				})
			}
		},
		mounted(){
			// wx.getUserInfo({
			// 	success: (res) => {
			// 		console.log(res);
			// 	}
			// })
		},
	}
</script>

<style>

</style>
