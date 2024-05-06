import request from '@/utils/request'

export const getActivityList = async (params:any) => {
  return await request({
    url: '/bpm/activity/list',
    method:"get",
    params
  })
}
