import request from '@/utils/request'

export type UserGroupVO = {
  id: number
  name: string
  description: string
  userIds: number[]
  status: number
  remark: string
  createTime: string
}

// 创建用户组
export const createUserGroup = async (data: UserGroupVO) => {
  return await request({
    url: '/bpm/user-group/create',
    data: data,
    method:'post'
  })
}

// 更新用户组
export const updateUserGroup = async (data: UserGroupVO) => {
  return await request({
    url: '/bpm/user-group/update',
    data: data,
    method:'put'
  })
}

// 删除用户组
export const deleteUserGroup = async (id: number) => {
  return await request({ url: '/bpm/user-group/delete?id=' + id ,method:'delete'})
}

// 获得用户组
export const getUserGroup = async (id: number) => {
  return await request({ url: '/bpm/user-group/get?id=' + id ,method:'get'})
}

// 获得用户组分页
export const getUserGroupPage = async (params:any) => {
  return await request({ url: '/bpm/user-group/page', params ,method:'get'})
}

// 获取用户组精简信息列表
export const getUserGroupSimpleList = async (): Promise<UserGroupVO[]> => {
  return await request({ url: '/bpm/user-group/simple-list' ,method:'get'}) as any
}
