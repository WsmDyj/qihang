import request from '@/utils/request'
interface articleId {
  article_id: number
}

export const getlikeArticle = (data: articleId) =>
  request({
    url: 'api/actions/like',
    method: 'post',
    data
  })

  export const getlikesList = () =>
  request({
    url: 'api/actions/getLikelists',
    method: 'get',
  })