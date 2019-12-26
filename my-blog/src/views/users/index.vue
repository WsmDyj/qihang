<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="info-content">
        <div class="info-box" v-for="(user, index) in users" :key="index">
          <authorInfo :userInfo= user >
            <div slot="content" class="author-desc">
             <div class="info-desc">{{user.job}} @{{user.company}}</div>
              <div class="info-detail">获得 {{ user.likes }} 赞 · {{ user.reviews }} 阅读</div>
            </div>
          </authorInfo>
          <author-follow size='small' :author = user.nickname ></author-follow>
        </div>
        <div class="skeleton-row"></div>
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

@Component({
  name:'home',
  components: {
    Header,
    authorInfo,
    authorFollow
  }
})
export default class extends Vue {
  private users: any[] = []
  private async created() {
    const { data } = await getuserList()
    this.users = data
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 932px;
    margin-top: 80px;
    margin-bottom: 20px;
    position: relative;
    @include flexcenter($jc:space-between, $ai: none);
    .info-content {
      width: 668px;
      background: #fff;
      .info-box {
        padding: 20px 50px 20px 30px;
        border-bottom: 1px solid $border-bottom;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-desc {
          font-weight: 400;
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
    .skeleton-row {
      width: 80%;
      height: 14px;
      background: linear-gradient(90deg,#fff,#edeff1,#fff);
      background-size: 480px 480px;
      margin: 20px;
      animation: skeleton-stripes .6s linear infinite;
    }
  }
}
@keyframes skeleton-stripes{
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 534px;
    background-image: linear-gradient(90deg, rgb(255, 255, 255), rgb(237, 239, 241), rgb(255, 255, 255));
  }
  
}
</style>
