<template>
  <div 
    class="follow-button" 
    :class="!show ? `unfollow-button follow-button__${size}` : `following-button follow-button__${size}`" 
    @click.stop="follow(author)">
    {{ show ? '已关注' : '关注' }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'
import { followsModule } from '../../store/modules/follow'
import { getfollowList, getfollow, getunfollow } from '../../api/follow'
import { IFollow } from '../../api/types'

@Component
export default class extends Vue {
  @Prop() private author!: string
  @Prop() private size!: string
  private show: boolean = false
  private lists: string[] = []

  @Watch('author', {immediate:true, deep: true})
  private async watchAuthor(old:string, val: string) {
    this.follows.filter((item: any) => {
      this.lists.push(item.author)
    })
    this.show = await this.lists.indexOf(old) != -1 ? true : false
  }

  get nickname() {
    return UserModule.nickname
  }
  get token() {
    return UserModule.token
  }
  get follows() {
    return followsModule.follows
  }
  private async follow (username: string) {
    if (this.token) {
      this.show = !this.show
      this.show ? await getfollow({username: username}) : await getunfollow({username: username})
    } else {
      UserModule.handleIslogin(true)
    }
  }

  private async created() {
    // const { data } = await getfollowList()
    // data[0].data.filter((item: any) => {
    //   this.lists.push(item.author)
    // })
  }
}
</script>

<style lang="scss" scoped>
.follow-button {
  margin: 0 0 0 auto;
  width: 6.6rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 1.1rem;
  color: #37c701;
  background-color: #fff;
  border: 1px solid rgba(55,199,1,.6);
  border-radius: 2px;
  cursor: pointer;

  &__medium {
    width: 86px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    border-radius: 4px;
    font-weight: bold;
  }
}
.unfollow-button {
  color: #6cbd45;
  background-color: #fff;
}

.following-button {
  color: #fff;
  background-color: #6cbd45;
}
</style>
