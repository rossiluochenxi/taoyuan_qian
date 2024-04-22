import request from '@/utils/request'

// 查询牲畜档案管理列表
export function listagroIndex() {
  return request({
    url: '/agro/index/list',
    method: 'get',
  })
}
