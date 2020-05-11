<template>
  <div class="author">
    <div class="author-avatar">
      <el-avatar :size="90" :src = userInfo.avatar />
    </div>
    <div class="author-info">
      <div class="author-info__username">{{ userInfo.nickname }}</div>
      <div class="author-info__position">
        <div class="center" v-if="userInfo.job">
          <svg width="21" height="18" viewBox="0 0 21 18" class="icon"><g fill="none" fill-rule="evenodd"><path data-v-34b23271="" fill="#72777B" d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path> <path data-v-34b23271="" stroke="#72777B" d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path></g></svg>
          <span>{{ userInfo.job }} | @ {{ userInfo.company || '添加公司' }}</span>
        </div>
        <router-link target="_blank" to="/settings " class="addInfo" v-else>
          <span>+ 你喜欢什么工作？</span>
        </router-link>
      </div>
      <div class="author-info__position">
        <div class="center" v-if="userInfo.autograph">
          <svg width="21" height="18" viewBox="0 0 21 18" class="icon"><path fill="#72777B" fill-rule="evenodd" d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path></svg>
          <span>{{ userInfo.autograph }}</span>
        </div>
        <router-link target="_blank" to="/settings " class="addInfo" v-else>
          <span>+ 你的人生格言是什么？</span>
        </router-link>
      </div>
    </div>
    <router-link target="_blank" to="/settings " class="mobile-none" v-if="visible">
      <el-button type="primary" plain>编辑个人资料</el-button>
    </router-link>
    <div class="mobile-none" v-else>
      <author-follow size='medium' :author= userInfo.nickname />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { UserModule }  from '../../../store/modules/user'
import authorFollow from '@/components/follow/index.vue'
import { IUserInfo } from '../../../api/types'

@Component({
  components: {
    authorFollow
  },
})


export default class extends Vue {
  private visible: boolean = false
  @Prop() private userInfo!: IUserInfo
  get nickname() {
    return UserModule.nickname
  }

  private created() {
    if (this.$route.query.author == this.nickname) {
      this.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.author {
  padding: 3rem 2rem;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: flex-end;
  @media only screen and (max-width: 750px) { 
    padding: 2rem 2rem;
  }
  .author-info {
    margin-left: 2rem;
    flex: 1 1 auto;
    @include flexcolumn($jc:center, $ai: none);

    &__username {
      font-size: 2.4rem /* 28/12 */;
      font-weight: bold;
      color: #000;
    }

    &__position {
      text-align: center;
      margin-top: 0.8rem;
      font-size: 1.2rem;
      color: $navcolor-header;
      &:last-child {
        margin-top: .7rem;
      }
      .center {
        display: flex;
        align-items: center;
        .icon {
          margin:0 5px 3px 0;
        }
      }
      .addInfo {
        color: #4a68ad;
      }
    }
  }
}
</style>