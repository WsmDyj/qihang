import request from '@/utils/request'
interface author {
  isadmin: string
}

export const getArticles = (params?: author) =>
  request({
    url: 'api/blog/list',
    method: 'get',
    params
  })


