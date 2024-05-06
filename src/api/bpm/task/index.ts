import request from '@/utils/request'

export type TaskVO = {
  id: number
}

export const getTaskTodoPage = async (params: any) => {
  return await request({ url: '/bpm/task/todo-page', params,method:'get' })
}

export const getTaskDonePage = async (params: any) => {
  return await request({ url: '/bpm/task/done-page', params,method:'get'  })
}

export const getTaskManagerPage = async (params: any) => {
  return await request({ url: '/bpm/task/manager-page', params,method:'get'  })
}

export const approveTask = async (data: any) => {
  return await request({ url: '/bpm/task/approve', data ,method:'put' })
}

export const rejectTask = async (data: any) => {
  return await request({ url: '/bpm/task/reject', data ,method:'put' })
}

export const getTaskListByProcessInstanceId = async (processInstanceId: string) => {
  return await request({
    url: '/bpm/task/list-by-process-instance-id?processInstanceId=' + processInstanceId,method:'get'

  })
}

// 获取所有可回退的节点
export const getTaskListByReturn = async (id: string) => {
  return await request({ url: '/bpm/task/list-by-return', params: { id } ,method:'get' })
}

// 回退
export const returnTask = async (data: any) => {
  return await request({ url: '/bpm/task/return', data ,method:'put' })
}

// 委派
export const delegateTask = async (data: any) => {
  return await request({ url: '/bpm/task/delegate', data ,method:'put' })
}

// 转派
export const transferTask = async (data: any) => {
  return await request({ url: '/bpm/task/transfer', data,method:'put'  })
}

// 加签
export const signCreateTask = async (data: any) => {
  return await request({ url: '/bpm/task/create-sign', data ,method:'put' })
}

// 减签
export const signDeleteTask = async (data: any) => {
  return await request({ url: '/bpm/task/delete-sign', data ,method:'delete' })
}

// 获取减签任务列表
export const getChildrenTaskList = async (id: string) => {
  return await request({ url: '/bpm/task/list-by-parent-task-id?parentTaskId=' + id ,method:'get' })
}
