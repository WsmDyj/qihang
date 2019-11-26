<template>
  <div class="container">
    <router-link :to="{path: '/author', query:{author: userInfo.nickname}}" class="author">
      <div class="author-avatar">
        <el-avatar :size="45" :src= userInfo.avatar ></el-avatar>
      </div>
      <div class="author-info">
        <div class="author-usernam">{{userInfo.nickname}}</div>
        <div class="author-desc">{{userInfo.job}} @ {{userInfo.company}}</div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserInfo } from '../../../../api/types'

@Component
export default class extends Vue {
   @Prop() private userInfo!: IUserInfo
}
</script>
<style lang="scss" scoped>
.author {
  display: flex;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  box-sizing: border-box;
  .author-avatar {
    margin-right: 12px;
  }
  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .author-usernam {
      color: #333;
      font-size: 14px;
    }
    .author-desc {
      color: #909090;
      font-size: 12px;
    }
  }
}
</style>