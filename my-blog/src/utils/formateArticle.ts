import { IArticleData } from '../api/types'
import { ArticleModule } from '../store/modules/article'

export function fommentArticle(data: IArticleData[]) {
  data.forEach((item: IArticleData) => {
    item.content = item.content.replace(/<[^>]+>/g, '')
    if (ArticleModule.likeArticlId.indexOf(item.article_id) != -1) {
      item.islike = true
    }
  })
  return data
}