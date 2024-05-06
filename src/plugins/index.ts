import tab from './tab'
import auth from './auth'
import cache from './cache'
import modal from './modal'
import download from './download'
// 引入 form-create
import { setupFormCreate } from './formCreate'
import type { App } from 'vue'

export default function installPlugins(app:App<Element>){
  // 页签操作
  app.config.globalProperties.$tab = tab
  // 认证对象
  app.config.globalProperties.$auth = auth
  // 缓存对象
  app.config.globalProperties.$cache = cache
  // 模态框对象
  app.config.globalProperties.$modal = modal
  // 下载文件
  app.config.globalProperties.$download = download
  setupFormCreate(app)
}

export {modal}