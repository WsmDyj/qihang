import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IFollow } from '../../api/types'
import { getfollowList  } from '../../api/follow'


@Module({ dynamic: true, store, name: 'follows' })
class Follow extends VuexModule {
  public follows: IFollow[] = []
  @Mutation
  private SET_FOLLOWS(list: IFollow[]) {
    this.follows = []
    this.follows = this.follows.concat(list)
  }
  
  @Action
  public async getFollows() {
    const { data } = await getfollowList()
    this.SET_FOLLOWS(data[0].data)
  } 
}
export const followsModule = getModule(Follow)