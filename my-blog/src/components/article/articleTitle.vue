<template>
  <div class="article-header">
    <div class="article-header__avatar" @click.stop="hanleClick" v-if="isAvatar">
      <el-avatar size="medium" :src= isAvatar></el-avatar>
    </div>
    <div class="article-header__name" @click.stop="hanleClick">{{ article.author.nickname || article.author}}</div>
    <div class="article-header__time">{{ articleTime }}</div>
    <div class="article-header__tags">{{article.articleTag.replace(/\,/g, " / ")}}</div>
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
.article-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.083333rem /* 13/12 */;
  color: #b2bac2;
  &__avatar {
    padding-right: 1rem;
  }
  &__name:hover {
    cursor: pointer;
    color: $primary;
  }

  &__time {
    @include textRound();
    @include textRoundRight();
  }
}
</style>
