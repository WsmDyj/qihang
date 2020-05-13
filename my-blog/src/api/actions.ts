import request from '@/utils/request'
interface articleId {
  article_id: number
}
interface author {
  author: string | (string | null)[],
  page: number
}
interface adopt {
  askId: string | (string | null)[]
  comment_id: string
  comment_status: number
}

export const getlikeArticle = (data: articleId) =>
  request({
    url: 'api/actions/like',
    method: 'post',
    data
  })
export const getAdoptComment = (data: adopt) =>
  request({
    url: 'api/actions/adopt',
    method: 'post',
    data
  })

export const getreviewArticle = (data: any) =>
  request({
    url: 'api/actions/review',
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

export const getSharelist = () =>
  request({
    url: 'api/share/list',
    method: 'get',
  })