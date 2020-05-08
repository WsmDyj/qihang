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
    margin-left: .857143rem /* 12/14 */;
    .author-name {
      font-size: 1.071429rem /* 15/14 */;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      &--comment {
        font-size: .928571rem /* 13/14 */;
        color: #333;
        .author-job {
          color: #8a9aa9;
          font-size: .857143rem /* 12/14 */;
          margin-left: .285714rem /* 4/14 */;
        }
      }
      &--reply {
        font-size: .928571rem /* 13/14 */;
        color: #333;
        .author-job {
          color: #8a9aa9;
          font-size: .857143rem /* 12/14 */;
          margin-left: .285714rem /* 4/14 */;
        }
      }
    }
    .author-content {
      width: 100%;
      font-size: .928571rem /* 13/14 */;
      color: $fontcolor;
      &--comment {
        margin-top: .714286rem /* 10/14 */;
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
