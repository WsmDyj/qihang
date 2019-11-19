import request from '@/utils/request'
interface articleId {
  article_id: number
}
interface author {
  author: string | (string | null)[]
}

export const getlikeArticle = (data: articleId) =>
  request({
    url: 'api/actions/like',
    method: 'post',
    data
  })
export const removelike = (data: articleId) =>
  request({
    url: 'api/actions/removelike',
    method: 'post',
    data
  })

export const getlikesList = (params?: author) =>
  request({
    url: 'api/actions/getLikelists',
    method: 'get',
    params
  })