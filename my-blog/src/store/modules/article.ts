import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IArticleData } from '../../api/types'
import { getlikesList  } from '../../api/actions'


@Module({ dynamic: true, store, name: 'article' })
class Article extends VuexModule {
  public likeArticles: IArticleData[] = []

 
  @Mutation
  private SET_ARTICLE(article: IArticleData) {
    this.likeArticles = this.likeArticles.concat(article)
  }
  @Action
  public async getLikeLists() {
    const { data } = await getlikesList()
    this.SET_ARTICLE(data)
  } 
}
export const ArticleModule = getModule(Article)