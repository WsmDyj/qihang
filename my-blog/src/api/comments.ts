import request from '@/utils/request'

interface articleId {
  article_id: string | (string | null)[]
}

export const createComment = (data: any) =>
  request({
    url: 'api/comment/new',
    method: 'post',
    data
  })

export const getComment = (params: articleId) =>
  request({
    url: 'api/comment/getComment',
    method: 'get',
    params
  })
export const createReply = (data: any) =>
  request({
    url: 'api/comment/newReply',
    method: 'post',
    data
  })