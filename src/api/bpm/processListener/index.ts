import request from '@/utils/request'

// BPM 流程监听器 VO
export interface ProcessListenerVO {
  id: number // 编号
  name: string // 监听器名字
  type: string // 监听器类型
  status: number // 监听器状态
  event: string // 监听事件
  valueType: string // 监听器值类型
  value: string // 监听器值
}

// BPM 流程监听器 API
export const ProcessListenerApi = {
  // 查询流程监听器分页
  getProcessListenerPage: async (params: any) => {
    return await request({ url: `/bpm/process-listener/page`, params,method:'get' })
  },

  // 查询流程监听器详情
  getProcessListener: async (id: number) => {
    return await request({ url: `/bpm/process-listener/get?id=` + id ,method:'get'})
  },

  // 新增流程监听器
  createProcessListener: async (data: ProcessListenerVO) => {
    return await request({ url: `/bpm/process-listener/create`, data ,method:'post'})
  },

  // 修改流程监听器
  updateProcessListener: async (data: ProcessListenerVO) => {
    return await request({ url: `/bpm/process-listener/update`, data ,method:'put'})
  },

  // 删除流程监听器
  deleteProcessListener: async (id: number) => {
    return await request({ url: `/bpm/process-listener/delete?id=` + id,method:'delete' })
  }
}
