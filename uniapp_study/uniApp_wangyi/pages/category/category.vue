<template>
	<view class="categoryContainers">
		<input class="search" type="text" value="" placeholder="请输入搜索内容" placeholder-class="placeholder"/>
		
		<view class="contentContainer">
			<scroll-view class="leftContainer" scroll-y="true">
				<view class="navItem" v-for="(item, index) in leftList" :key='index'>
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="rightContainer">
				右侧内容区
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				leftList: []
			};
		},
		onLoad(){
			console.log('onLoad')
		},
		async mounted(){
			console.log('mounted')
			let result = await request('/categoryNavList')
			console.log(result)
			this.leftList = result.categoryL1List
		}
	}
</script>

<style lang="stylus">
	.categoryContainers
		.search
			width 96%
			height 60upx
			margin 20upx auto
			background #ededed
			.placeholder
				font-size 28upx
				text-align center
		.contentContainer
			display flex
			height calc(100vh - 100upx)
			.leftContainer
				width 150upx
				height 100%
				display flex
				flex-direction column
				.navItem
					width 150upx
					height 100upx
					line-height 100upx
					font-size 28upx
					text-align center
			.rightContainer
				height 100%
				width 600upx
				background pink
</style>
