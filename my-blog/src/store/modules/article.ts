import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IArticleData } from '../../api/types'
import { getlikesList  } from '../../api/actions'


@Module({ dynamic: true, store, name: 'article' })
class Article extends VuexModule {
  public likeArticles: IArticleData[] = []
  public likeArticlId: number[] =[]
 
  @Mutation
  private SET_ARTICLE(article: IArticleData) {
    this.likeArticles = []
    this.likeArticles = this.likeArticles.concat(article)
  }
  @Mutation
  private SET_LIKEID(data: IArticleData[]) {
    this.likeArticlId = []
    data.forEach(item => {
      this.likeArticlId.push(item.article_id)
    })
  }
  @Action
  public async getLikeLists() {
    const { data } = await getlikesList()
    data.forEach((item: any) => {
      Object.assign(item, {islike: true})
    })
    this.SET_ARTICLE(data)
    this.SET_LIKEID(data)
  } 
}
export const ArticleModule = getModule(Article)