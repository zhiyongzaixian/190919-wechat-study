<template>
	<view class="indexContainer">
		<scroll-view scroll-x="true" class="scorllView" enable-flex>
			<view @click="changeNav(index)" class="navItem"  :class="{active: navIndex === index}" v-for="(item, index) in navList" :key='index'>
				{{item}}
			</view>
		</scroll-view>
		
		<swiper class="navSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="https://yanxuan.nosdn.127.net/c53e8279c43273c4cde5eec5faae018d.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://yanxuan.nosdn.127.net/ef739c5f6ba97afbf201ee9d9b3eb16d.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://yanxuan.nosdn.127.net/7d38ac617e6175f468140d326b7ebcda.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				navList: ['推荐', '居家生活', '服饰鞋包', '美食酒水', '全球购物','居家生活', '服饰鞋包', '美食酒水', '全球购物','居家生活', '服饰鞋包', '美食酒水', '全球购物','居家生活', '服饰鞋包', '美食酒水', '全球购物']
			}
		},
		onLoad() {

		},
		methods: {
			changeNav(index){
				this.navIndex = index
			}
		}
	}
</script>

<style lang="stylus">
	.indexContainer
		.scorllView 
			display flex
			width 100%
			white-space nowrap
			.navItem
				display inline-block
				padding 20upx
				font-size 30upx
				&.active
					border-bottom 1upx solid #D43C33
		.navSwiper
			width 100%
			height 300upx
			.swiper-item
				width 100%
				height 100%
				image 
					width 100%
					height 100%
					
					
					
					
					
					
</style>
