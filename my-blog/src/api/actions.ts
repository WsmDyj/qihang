import request from '@/utils/request'
interface articleId {
  article_id: string | (string | null)[]
}

export const getlikeArticle = (data: articleId) =>
  request({
    url: 'api/actions/like',
    method: 'post',
    data
  })