import request from '@/utils/request'

// BPM 流程分类 VO
export interface CategoryVO {
  id: number // 分类编号
  name: string // 分类名
  code: string // 分类标志
  status: number // 分类状态
  sort: number // 分类排序
}

// BPM 流程分类 API
export const CategoryApi = {
  // 查询流程分类分页
  getCategoryPage: async (params: any) => {
    return await request({ url: `/bpm/category/page`, params, method:"get" })
  },

  // 查询流程分类列表
  getCategorySimpleList: async () => {
    return await request({ url: `/bpm/category/simple-list`,method:"get" })
  },

  // 查询流程分类详情
  getCategory: async (id: number) => {
    return await request({ url: `/bpm/category/get?id=` + id,method:"get" })
  },

  // 新增流程分类
  createCategory: async (data: CategoryVO) => {
    return await request({ url: `/bpm/category/create`, data, method:"post"})
  },

  // 修改流程分类
  updateCategory: async (data: CategoryVO) => {
    return await request({ url: `/bpm/category/update`, data ,method:"put"})
  },

  // 删除流程分类
  deleteCategory: async (id: number) => {
    return await request({ url: `/bpm/category/delete?id=` + id,method:"delete" })
  }
}
