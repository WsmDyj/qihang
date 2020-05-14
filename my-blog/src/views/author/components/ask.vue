<template>
  <div class="entry">
    <div class="entry-nav">
      <div class="entry-nav__title">问答</div>
      <tabs splitLine = true :tabs = tabs @click="selectNav" />
    </div>
    <div class="list-empty" v-if="isEmpty" >
      <empty description="这里空空如也" />
    </div>
    <van-list class="list-content" v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad"  v-else>
      <div class="entry-content" v-for="(ask, index) in asks" :key="index">
        <question-item :ask = ask @delete='deleteAsk' origin='author' />
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Message, MessageBox } from 'element-ui'
import questionItem from '../../questions/components/item.vue'
import { Iquestion } from '../../../api/types'
import tabs from '../../../components/tabs/index.vue'
import { getAskList, deleteAsk, getAnswerList } from '../../../api/question'
import { Qtag } from '../../../global'
import empty from '@/components/emptyBox/index.vue'
@Component({
  components: { 
    empty,
    tabs,
    questionItem
  }
})
export default class extends Vue {
  private asks: Iquestion[] = []
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private page: number = 0
  private radio: string = '0'
  private tabs: Qtag[] = [
    { value: '我的问题', label: '0'},
    { value: '我回答的', label: '1'},
  ]
  private async selectNav(event: Qtag) {
    this.noMore = false
    this.isEmpty = false
    this.asks = []
    this.page = 0
    this.radio = event.label
    this.fetchData(event.label)
  }
  private onLoad() {
    this.page = this.page + 1
    this.fetchData(this.radio)
  }
  async deleteAsk(item: string) {
    var r = confirm("确定删除吗？删除之后可能无法找回了")
    if (r){
      await deleteAsk({ask_id: item})
      window.location.reload(true);
    }
  }
  private async fetchData (event: string) {
    this.loading = true
    let data = {data: []}
    if (event === '1') {
      data = await getAnswerList({author: this.$route.query.author})
    } else {
      data = await getAskList({author: this.$route.query.author, articleTag: '全部', status: 0, page: this.page})
    }
    if (data.data.length > 0) {
      this.loading = false
      this.asks = this.asks.concat(data.data)
    } else {
      this.isEmpty = true
    }
    if (data.data.length < 20) {
      this.noMore = true
      this.loading = false
    }
  }
  private async created() {
   this.fetchData(this.radio)
  }
}
</script>

<style lang="scss" scoped>
.entry-nav {
  @include flexcenter($jc:space-between, $ai: center);
  padding: 2rem 1rem 2rem 2rem;
  border-bottom: 1px solid $border-color;
  background-color: #fff;
  color: $navcolor-header;
  @media only screen and (max-width: 767px) { 
    padding: 2rem 0 2rem 1rem;
  }
  &__title {
    font-size: 1.34rem;
    font-weight: bold;
    color: $title-color;
  }
}
</style>
