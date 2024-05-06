import request from '@/utils/request'

export type Task = {
  id: string
  name: string
}

export type ProcessInstanceVO = {
  id: number
  name: string
  processDefinitionId: string
  category: string
  result: number
  tasks: Task[]
  fields: string[]
  status: number
  remark: string
  businessKey: string
  createTime: string
  endTime: string
}

export type ProcessInstanceCopyVO = {
  type: number
  taskName: string
  taskKey: string
  processInstanceName: string
  processInstanceKey: string
  startUserId: string
  options: string[]
  reason: string
}

export const getProcessInstanceMyPage = async (params: any) => {
  return await request({ url: '/bpm/process-instance/my-page', params,method:'get' })
}

export const getProcessInstanceManagerPage = async (params: any) => {
  return await request({ url: '/bpm/process-instance/manager-page', params ,method:'get'})
}

export const createProcessInstance = async (data:any) => {
  return await request({ url: '/bpm/process-instance/create', data: data ,method:'post'})
}

export const cancelProcessInstanceByStartUser = async (id: number, reason: string) => {
  const data = {
    id: id,
    reason: reason
  }
  return await request({ url: '/bpm/process-instance/cancel-by-start-user', data: data,method:'delete' })
}

export const cancelProcessInstanceByAdmin = async (id: number, reason: string) => {
  const data = {
    id: id,
    reason: reason
  }
  return await request({ url: '/bpm/process-instance/cancel-by-admin', data: data ,method:'delete'})
}

export const getProcessInstance = async (id: string) => {
  return await request({ url: '/bpm/process-instance/get?id=' + id ,method:'get'})
}

export const getProcessInstanceCopyPage = async (params: any) => {
  return await request({ url: '/bpm/process-instance/copy/page', params ,method:'get'})
}
