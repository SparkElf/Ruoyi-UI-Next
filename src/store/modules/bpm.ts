import type { BpmModel, BpmnInstances } from "@/types/bpm"
import type { Element } from "bpmn-js/lib/model/Types"
import BpmnModeler from 'bpmn-js/lib/Modeler'
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
        loadedTime:undefined
    })
    const bpmnModeler=shallowRef<BpmnModeler>()
    const bpmnElement=shallowRef<Element>()
    const bpmnInstances=shallowRef<BpmnInstances>()
    function updateCurrentModel(model: BpmModel) {
        Object.assign(currentModel, model)
        currentModel.loadedTime=Date.now()
    }
    function updateElementBaseInfo(obj:any){
        if(!bpmnElement.value) return
        Object.assign(bpmnElement.value.businessObject,obj)
    }

    return { currentModel,updateCurrentModel,bpmnModeler,bpmnElement,bpmnInstances,updateElementBaseInfo }
})