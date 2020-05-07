<template>
  <div class="author">
    <router-link target="_blank" :to="{path: '/author', query:{author: userInfo.nickname}}" class="author-avatar" >
      <el-avatar :size="size" :src='userInfo.avatar'></el-avatar>
    </router-link>
    <div class="author-info">
      <router-link target="_blank" :to="{path: '/author', query:{author: userInfo.nickname}}" :class="type ? `author-name--${type}` : 'author-name'">
        {{ userInfo.nickname }}
        <span class="author-job" v-show="type">@{{userInfo.company || '公司'}}</span>
      </router-link>
      <div :class="type ? `author-content--${type}` : 'author-content'">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IUserInfo } from '../../api/types'

@Component
export default class extends Vue {
  @Prop({default: 48}) private size!: number
  @Prop() private type!: string
  @Prop() private userInfo!: IUserInfo
}
</script>

<style lang="scss" scoped>
.author {
  display: flex;
  .author-avatar {
    cursor: pointer;
  }
  .author-info {
    @include flexcolumn($jc: space-around);
    margin-left: 12px;
    .author-name {
      font-size: 15px;
      font-weight: 700;
      color: #333;
      cursor: pointer;
      &--comment {
        font-size: 13px;
        color: #333;
        font-weight: 400;
        .author-job {
          color: #8a9aa9;
          font-size: 12px;
          margin-left: 4px;
        }
      }
      &--reply {
        font-size: 13px;
        color: #333;
        font-weight: 400;
        .author-job {
          color: #8a9aa9;
          font-size: 12px;
          margin-left: 4px;
        }
      }
    }
    .author-content {
      width: 100%;
      font-style: 13px;
      color: $fontcolor;
      &--comment {
        margin-top: 10px;
        color: #505050;
      }
      &--reply {
        margin-top: 0;
        color: #505050;
      }
    }
  }

}
</style>
