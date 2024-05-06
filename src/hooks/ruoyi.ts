import useDictStore from '@/store/modules/dict'
import { getDicts } from '@/api/system/dict/data'
import type { Dict, DictItem } from '@/types/ruoyi';
import { DICT_TYPE } from '@/enums/dict';
import type{ Ref, ToRefs, UnwrapNestedRefs } from 'vue';
/**
 * 获取字典数据
 */

export function useDict<T extends keyof typeof DICT_TYPE>(...args: T[]): ToRefs<UnwrapNestedRefs<Dict<T>>>{
  const res = reactive<Dict<T>>({} as any);

  args.forEach((dictType, index) => {
    res[dictType] = [];
    const dicts = useDictStore().getDict(dictType);
    if (dicts) {
      res[dictType] = dicts;
    } else {
      getDicts(dictType).then(resp => {
        res[dictType] = resp.data!.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
        useDictStore().setDict(dictType, res[dictType]);
      })
    }
  })

  return toRefs(res) ;//保证解构后仍具有响应性
}