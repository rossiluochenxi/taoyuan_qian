import request from '@/utils/request'

// 查询牲畜档案管理列表
export function listagroIndex() {
  return request({
    url: '/agro/index/list',
    method: 'get',
  })
}

// 查询养殖户牲畜排名
export function listagroRankingFarmers() {
  return request({
    url: '/agro/index/agroNumlist',
    method: 'get',
  })
}

// 首页报警数据api
export function dmAlarmDataIndexList() {
  return request({ 
    url: '/dm/alarm/indexList',
    method: 'get',
  })
}