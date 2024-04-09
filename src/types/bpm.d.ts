export type BpmModel={
    id?: number
    formName?: string
    key?: string
    name?: string
    description?: string
    category?: string
    formType?: number
    formId?: number
    formCustomCreatePath?: string
    formCustomViewPath?: string
    processDefinition?: ProcessDefinitionVO
    status?: number
    remark?: string
    createTime?: string
    bpmnXml?: string
    loadedTime?:number
}
export type BpmnInstances={
        modeler: BpmnModeler,
        modeling: any,
        moddle: any,
        eventBus: any,
        bpmnFactory: any,
        elementFactory: any,
        elementRegistry: any,
        replace: any,
        selection:any

}