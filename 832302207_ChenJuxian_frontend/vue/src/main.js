//全局配置文件，引入第三方组件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

import ElementPlus from 'element-plus'    //element-plus组件
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'   //icon组件

import axios from "axios";

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
    locale: zhCn,
})

axios.get('/config.json').then(res => {
    app.config.globalProperties.$config = res.data;
})
export const globals = app.config.globalProperties

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {   //全局导入icon
    app.component(key, component)
}

