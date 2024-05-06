import request from '@/utils/request'

export type LeaveVO = {
  id: number
  status: number
  type: number
  reason: string
  processInstanceId: string
  startTime: string
  endTime: string
  createTime: string
}

// 创建请假申请
export const createLeave = async (data: LeaveVO) => {
  return await request({ url: '/bpm/oa/leave/create', data: data ,method:"post"})
}

// 获得请假申请
export const getLeave = async (id: number) => {
  return await request({ url: '/bpm/oa/leave/get?id=' + id,method:'get' })
}

// 获得请假申请分页
export const getLeavePage = async (params: any) => {
  return await request({ url: '/bpm/oa/leave/page', params,method:'get' })
}
