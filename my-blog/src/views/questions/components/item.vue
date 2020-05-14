<template>
  <div class="item" @click="checkAsk">
    <div class="item-content">
      <article-title :article= ask />
      <div class="item-content__title">
        <span class="item-content__text">{{ ask.title }}</span>
        <span v-if="origin && visible" class="item-content__delete iconfont" @click.stop="deleteAsk(ask)">&#xe6ea;</span>
      </div>
    </div>
    <div class="item-action mobile-none">
      <div class="item-action__votes" :class="ask.status == 2 ? 'solve' : 'not-solve'">
        <div class="votes-count">{{ ask.comments }}</div>
        <div class="votes-txt">{{ ask.status == 2 ? '解决': '回答'}}</div>
      </div>
      <div class="item-action__votes">
        <div class="votes-count">{{ ask.reviews }}</div>
        <div class="votes-txt">浏览</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import { Iquestion } from '../../../api/types'
import { UserModule } from '../../../store/modules/user'
import articleTitle from '@/components/article/articleTitle.vue'

@Component({
  components: {
    articleTitle,
  }
})
export default class extends Vue {
  @Prop() private ask!: Iquestion
  @Prop() private origin!: string
  get nickname() {
    return UserModule.nickname
  }

  private handleClick(author: string) {
    window.open(`/author?author=${author}`, '_blank')
  }

  get visible() {
    return this.nickname == this.ask.author ? true : false
  }

  @Emit('delete')
  private async deleteAsk(item: Iquestion) {
    return item.question_id
  }
  private checkAsk() {
    window.open(`/checkAsk?askId=${this.ask.question_id}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.item {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 2rem;
  @include flexcenter($jc: none, $ai: center);
  border-bottom: 1px solid $border-article-color;
  @media only screen and (max-width: 767px) { 
    padding: 1rem;
  }
  &:hover {
    background-color: $hover-color;
    .item-content__delete {
      display: inline-block;
    }
  }
}

.item-content {
  flex: 1;
  position: relative;
  &__title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 1rem;
    color: #2e3135;
    cursor: default;
    @include twoLines();
    line-height: 1.2;
    
  }
  &__text:hover {
    text-decoration: underline;
  }
  &__delete {
    display: none;
    padding-left: 1rem;
    font-size: 1.4rem;
    color: #F56C6C;
  }
}

.item-action {
  color: #757575;
  &__votes {
    display: inline-block;
    cursor: default;
    margin-left: 2.5rem;
    font-size: 1.083333rem /* 13/12 */;
    padding: 0.6rem 0.8rem;
    text-align: center;
    .votes-count {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
  }
  .solve {
    background: $primary;
    color: #fff;
    border-radius: 4px;
  }
  .not-solve {
    border-radius: 4px;
    background: rgba(2,127,255,0.08);
    color: $primary;
    border: 1px solid rgba(2,127,255,0.16);
  }
}
</style>
