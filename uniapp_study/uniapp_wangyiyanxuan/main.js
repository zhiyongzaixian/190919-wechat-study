import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


// 声明当前组件的类型是 应用 application
App.mpType = 'app'

// 生成实例 = App()
const app = new Vue({
    ...App
})

// 挂载实例 
app.$mount()


// new Vue({
// 	el: '#app',
// 	render: h => h(App)
// })