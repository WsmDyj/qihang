<template>
  <div class="author">
    <router-link target="_blank" :to="{path: '/author', query:{author: userInfo.nickname}}" class="author-avatar" >
      <el-avatar :size="size" :src='userInfo.avatar'>
        <img src="https://img13.360buyimg.com/imagetools/jfs/t1/124873/15/1130/935/5eba4868Eb3438cb5/e5222b21249a212e.jpg"/>
      </el-avatar>
    </router-link>
    <div class="author-info">
      <router-link target="_blank" v-html="userInfo.nickname" :to="{path: '/author', query:{author: userInfo.nickname}}" :class="type ? `author-name--${type}` : 'author-name'">
        <span class="author-job" v-show="type">@{{userInfo.company || '添加公司'}}</span>
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
  .author-info {
    @include flexcolumn($jc: space-around);
    margin-left: 1rem;
    .author-name {
      display: inline-block;
      font-size: 1.3rem;
      font-weight: 700;
      color: $text-color;
      &--comment {
        color: $text-color;
        flex: 1 1 auto;
        color: #333;
        font-size: 1.083rem;
        font-weight: 400;
        .author-job {
          color: #8a9aa9;
          margin-left: 4px;
        }
      }
    }
    .author-content {
      width: 100%;
      font-size: 1.083333rem /* 13/12 */;
      color: $fontcolor;
      &--comment {
        margin-top: .5rem;
        font-size: 1.083rem;
        line-height: 1rem;
        word-wrap: break-word;
        white-space: pre-wrap;
        word-break: break-all;
        color: #505050;
      }
    }
  }

}
</style>
