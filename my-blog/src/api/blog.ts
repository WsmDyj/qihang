import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'api/blog/list',
    method: 'get',
  })
}
