<template>
  <div class="article-title">
    <div class="item avatar" @click.stop="hanleClick" v-if="isAvatar">
      <el-avatar size="medium" :src= isAvatar></el-avatar>
    </div>
    <div class="item author" @click.stop="hanleClick">{{ article.author.nickname || article.author}}</div>
    <div class="item">{{ articleTime }}</div>
    <div class="item articleTag">{{article.articleTag}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../../../api/types'
import { UserModule } from '../../../../store/modules/user'
import formatDate from '../../../../utils/formatDate'

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
  color: #b2bac2;
  .item {
    position: relative;
    font-size: .928571rem /* 13/14 */;
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
    font-size: .928571rem /* 13/14 */;
    @include textRoundRight();
    &:hover {
      color: #007fff;
    }
  }
  .articleTag {
    @include textRound();
  }
}
</style>

