import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IArticleData } from '../../api/types'

@Module({ dynamic: true, store, name: 'article' })
class Article extends VuexModule implements IArticleData {
  public id = 0
  public title = ''
  public content = ''
  public createtime = ''
  public author = ''
  public likeCont = 0

  @Mutation
  private SET_ID(id: number) {
    this.id = id
  }
  @Mutation
  private SET_TITLE(title: string) {
    this.title = title
  }
  @Mutation
  private SET_CONTENT(content: string) {
    this.content = content
  }
  @Mutation
  private SET_CREATETIME(createtime: string) {
    this.createtime = createtime
  }
  @Mutation
  private SET_AUTHOR(author: string) {
    this.author = author
  }
  @Mutation
  private SET_LIKECOUNT(likeCont: number) {
    this.likeCont = likeCont
  }
  @Action
  public async CheckArticle(params: IArticleData) {
    const { id, title, content, createtime, author, likeCont } = params
    this.SET_ID(id)
    this.SET_TITLE(title)
    this.SET_CONTENT(content)
    this.SET_CREATETIME(createtime)
    this.SET_AUTHOR(author)
    this.SET_LIKECOUNT(likeCont)
  } 
  

}


export const ArticleModule = getModule(Article)