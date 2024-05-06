import type { BpmModel } from '@/types/bpm'
import request from '@/utils/request'

export type ProcessDefinitionVO = {
  id: string
  version: number
  deploymentTIme: string
  suspensionState: number
}

export type ModelVO = BpmModel

export const getModelPage = async (params:any) => {
  return await request({ url: '/bpm/model/page', params ,method:'get'})
}

export const getModel = async (id: string) => {
  return await request({ url: '/bpm/model/get?id=' + id,method:'get' })
}

export const updateModel = async (data: ModelVO) => {
  return await request({ url: '/bpm/model/update', data: data,method:'put' })
}

// 任务状态修改
export const updateModelState = async (id: number, state: number) => {
  const data = {
    id: id,
    state: state
  }
  return await request({ url: '/bpm/model/update-state', data: data ,method:'put'})
}

export const createModel = async (data: ModelVO) => {
  return await request({ url: '/bpm/model/create', data: data,method:'post' })
}

export const deleteModel = async (id: number) => {
  return await request({ url: '/bpm/model/delete?id=' + id,method:'delete' })
}

export const deployModel = async (id: number) => {
  return await request({ url: '/bpm/model/deploy?id=' + id,method:'post' })
}
