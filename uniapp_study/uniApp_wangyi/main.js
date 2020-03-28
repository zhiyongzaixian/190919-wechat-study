import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

//  声明当前组件代表的是整个应用 application
App.mpType = 'app'

const app = new Vue({
    ...App
})

// 挂载当前的实例
app.$mount()
