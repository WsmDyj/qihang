<template>
  <div class="follow-action">
    <el-button 
      v-show="nickname != author" 
      :size='size'
      :type=" show ? 'success' : '' "
      @click.stop="follow(author)"
    >
      {{ show ? '已关注' : '关注' }}
  </el-button >
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
  get follows() {
    return followsModule.follows
  }
  private async follow (username: string) {
    this.show = !this.show
    if (this.show) {
      await getfollow({username: username})
    } else {
      await getunfollow({username: username})
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
.follow-action {
  font-size: 13px;
  text-align: center;
  padding: 0;
}
.unfollow {
  color: #6cbd45;
  background-color: #fff;
}
.follow {
  color: #fff;
  background-color: #6cbd45;
}
</style>
