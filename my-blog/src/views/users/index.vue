<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="section">
        <div class="info-box" v-for="(user, index) in users" :key="index">
          <authorInfo :userInfo= user >
            <div slot="content" class="author-desc">
             <div class="info-desc">{{user.job}} @{{user.company || '添加公司'}}</div>
              <div class="info-detail">获得 {{ user.likes }} 赞 · {{ user.reviews }} 阅读</div>
            </div>
          </authorInfo>
          <author-follow size='small' :author = user.nickname ></author-follow>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getuserList } from '../../api/user'
import Header from '@/components/header/index.vue'
import authorInfo from '@/components/authorInfo/index.vue'
import authorFollow from '@/components/follow/index.vue'
import { IUserInfo } from '../../api/types'

@Component({
  name:'home',
  components: {
    Header,
    authorInfo,
    authorFollow
  }
})
export default class extends Vue {
  private users: IUserInfo[] = []
  private async created() {
    const { data } = await getuserList()
    this.users = data
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #fff;
  .info-box {
    padding: 1.428571rem /* 20/14 */ 3.571429rem /* 50/14 */ 1.428571rem /* 20/14 */ 2.142857rem /* 30/14 */;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-desc {
      color: #b9c0c8;
      font-size: 12px;
      padding: 5px 0;
    }
    .info-detail {
      color: #777d81;
      font-size: 12px;
    }
  }
}
</style>
