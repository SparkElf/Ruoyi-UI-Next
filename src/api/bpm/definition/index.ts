import request from '@/utils/request'

export const getProcessDefinition = async (id: number, key?: string) => {
  return await request({
    url: '/bpm/process-definition/get',
    params: { id, key },
    method: 'get'
  })
}

export const getProcessDefinitionPage = async (params:any) => {
  return await request({
    url: '/bpm/process-definition/page',
    params,
    method: 'get'
  })
}

export const getProcessDefinitionList = async (params:any) => {
  return await request({
    url: '/bpm/process-definition/list',
    params,
    method: 'get'
  })
}
