<template>
  <div class="card">
    <cardModule title="🎖️作者榜">
      <div class="center">
        <div class="ranking" v-for="(user, index) in users" :key="index">
          <authorInfo type='comment' :size='40' :userInfo= user >
            <div slot="content" class="author-desc">{{user.autograph}}</div>
          </authorInfo>
        </div>
      </div>
     
      <div class="card-bottom">
        <router-link class="link" target="_blank" to="/users">完整榜单 ></router-link>
      </div>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'
import authorInfo from '../../authorInfo/index.vue'
import { getuserList } from '../../../api/user'
import { IUserInfo } from '../../../api/types'

@Component({
  components: {
    cardModule,
    authorInfo
  },
})
export default class extends Vue {
  private users: IUserInfo[] = []
  private async created() {
    const { data } = await getuserList({top: 3})
    this.users = data
  }
}
</script>
<style lang="scss" scoped>
.card {
  cursor: pointer;
  .center {
    height: 201px;
  }
  .ranking {
    padding: 12px 15px;
    &:hover {
      background-color: hsla(0,0%,84.7%,.1);
    }
    .author-desc {
      width: 130px;
      font-size: 12px;
      color: $fontcolor;
      margin-top: -10px;
      @include nowrap();
    }
  }
  .card-bottom {
    font-weight: 500;
    height: 42px;
    line-height: 42px;
    text-align: center;
    border-top: 1px solid $border-bottom;
    .link {
      color: $primary;
    }
  }
}
</style>
