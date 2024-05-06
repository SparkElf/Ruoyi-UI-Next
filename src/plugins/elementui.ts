import type { App } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import Cookies from 'js-cookie'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export function installElementUI(app: App) {
    // 使用element-plus 并且设置全局的大小
    app.use(ElementPlus, {
        locale: locale,
        // 支持 large、default、small
        size: Cookies.get('size') as 'default' | 'large' | 'small' || 'default'
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component('Icon'+key, component)
    }
}
