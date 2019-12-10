<template>
  <div class="article-title">
    <div class="item avatar" @click.stop="hanleClick" v-if="isAvatar">
      <el-avatar size="medium" :src= isAvatar></el-avatar>
    </div>
    <div class="item post" :style="{color: article.likeCount > 20 ? 'red' : ''}" v-else>
      {{article.likeCount > 20 ? '热' : '专栏'}}</div>
    <div class="item author" @click.stop="hanleClick">{{ article.author.nickname}}</div>
    <div style="font-size:12px;font-weight: 600;">{{ articleTime }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../api/types'
import { UserModule } from '../../store/modules/user'
import formatDate from '../../utils/formatDate'

@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
  @Prop() private isAvatar!: string
  private articleTime: string = ''

  private hanleClick() {
    window.open(`/author?author=${this.article.author}`, '_blank')
  }
  
  created() {
    this.articleTime = formatDate(this.article.createtime)
  }
}
</script>

<style lang="scss" scoped>
.article-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #b2bac2;
  .item {
    position: relative;
    &::after {
      content: "·";
      color: #b2bac2;
      margin: 0px 2px;
    }
  }
  .avatar {
    padding-right: 10px;
    &::after {
      display: none;
    }
  }
  .post {
    font-weight: 500;
    color: #b71ed7;
  }
  .author {
    font-size:12px;
    font-weight: 600;
    &:hover {
      color: #007fff;
    }
  }
}
</style>

