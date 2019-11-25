<template>
  <div class="follow-action">
    <el-button 
      v-show="nickname != author" 
      :size='size'
      :type=" follows ? 'success' : '' "
      @click="follow(author)"
    >
      {{ follows ? '已关注' : '关注' }}
  </el-button >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'
import { getfollowList, getfollow, getunfollow } from '../../api/follow'
@Component
export default class extends Vue {
  @Prop() private author!: string
  private follows: boolean = false
  @Prop() private size!: string

  @Watch('author')
  private async watchAuthor(val: string) {
    const { data } = await getfollowList()
    data[0].data.filter((item: any) => {
      if (item.author == val) {
        this.follows = true
      }
    })
  }

  get nickname() {
    return UserModule.nickname
  }
  private async follow(username: string) {
    this.follows = !this.follows
    if (this.follows) {
      await getfollow({username: username})
    } else {
      await getunfollow({username: username})
    }
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
