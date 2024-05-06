import request from '@/utils/request'

export type FormVO = {
  id: number
  name: string
  conf: string
  fields: string[]
  status: number
  remark: string
  createTime: string
}

// 创建工作流的表单定义
export const createForm = async (data: FormVO) => {
  return await request({
    url: '/bpm/form/create',
    data: data,
    method:"post",
  })
}

// 更新工作流的表单定义
export const updateForm = async (data: FormVO) => {
  return await request({
    url: '/bpm/form/update',
    data: data,
    method:"put",
  })
}

// 删除工作流的表单定义
export const deleteForm = async (id: number) => {
  return await request({
    url: '/bpm/form/delete?id=' + id,
    method:'delete'
  })
}

// 获得工作流的表单定义
export const getForm = async (id: number) => {
  return await request({
    url: '/bpm/form/get?id=' + id,
    method:'get'
  })
}

// 获得工作流的表单定义分页
export const getFormPage = async (params:any) => {
  return await request({
    url: '/bpm/form/page',
    params,
    method:'get'
  })
}

// 获得动态表单的精简列表
export const getFormSimpleList = async () => {
  return await request({
    url: '/bpm/form/simple-list',
    method:'get'
  })
}
