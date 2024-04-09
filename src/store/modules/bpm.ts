import type { BpmModel } from "@/types/bpm"

export const useBpmStore = defineStore('bpm', () => {
    const currentModel = reactive<BpmModel>({
        id: undefined,
        formName: undefined,
        key: undefined,
        name: undefined,
        description: undefined,
        category: undefined,
        formType: undefined,
        formId: undefined,
        formCustomCreatePath: undefined,
        formCustomViewPath: undefined,
        processDefinition: undefined,
        status: undefined,
        remark: undefined,
        createTime: undefined,
        bpmnXml: undefined,
    })

    return { currentModel }
})