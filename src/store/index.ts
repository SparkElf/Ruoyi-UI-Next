const store = createPinia()

export default store

import useAppStore from "./modules/app"
import useDictStore from "./modules/dict"
import usePermissionStore from "./modules/permission"
import useSettingsStore from "./modules/settings"
import useTagsViewStore from "./modules/tagsView"
import useUserStore from "./modules/user"
export {useAppStore,useDictStore,usePermissionStore,useSettingsStore,useTagsViewStore,useUserStore}