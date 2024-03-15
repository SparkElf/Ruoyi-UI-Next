import useDictStore from '@/store/modules/dict'
import { getDicts } from '@/api/system/dict/data'
import type { DictItem } from '@/types/ruoyi';

/**
 * 获取字典数据
 */
export function useDict(...args: any[]) {
  const res = ref<Record<string,DictItem[]>>({});
  return (() => {
    args.forEach((dictType, index) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDicts(dictType).then(resp => {
          res.value[dictType] = resp.data!.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
          useDictStore().setDict(dictType, res.value[dictType]);
        })
      }
    })
    return toRefs(res.value);
  })()
}