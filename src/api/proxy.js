import qs from 'qs'
import request from '@/utils/request'

const urlApi = {
  addProxyGroup: '/Account/addProxyGroup', // 添加代理组
  getProxyGroups: '/Account/getProxyGroups', // 获取代理组
  addProxy: '/Account/addProxy' // 获取IP代理
}

export function addProxyGroup(params) {
  return request({
    url: urlApi.addProxyGroup,
    method: 'post',
    params
  })
}
export function getProxyGroups(params) {
  return request({
    url: urlApi.getProxyGroups,
    method: 'post',
    params
  })
}

export function addProxy(params) {
  return request({
    url: `${urlApi.addProxy}?${qs.stringify(params)}`,
    method: 'post'
  })
}
