import type { App } from 'vue'

import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'
// 参考 http://www.form-create.com/v3/element-ui/auto-import.html 文档
export const setupFormCreate = (app: App<Element>) => {
  app.use(formCreate)
  app.use(FcDesigner)
}
