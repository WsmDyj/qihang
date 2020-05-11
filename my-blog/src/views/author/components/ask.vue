<template>
  <div class="entry">
    <div class="entry-nav">
      <div class="entry-nav__title">问答</div>
      <tabs :tabs = tabs @click="selectNav" />
    </div>
    <van-list>
      <div class="entry-content" v-for="(ask, index) in asks" :key="index">
        <question-item :ask = ask @delete='deleteAsk' origin='author' />
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Message, MessageBox } from 'element-ui'
import emptyBox from '@/components/emptyBox/index.vue'
import questionItem from '../../questions/components/item.vue'
import { Iquestion } from '../../../api/types'
import tabs from '../../../components/tabs/index.vue'
import { getAskList, deleteAsk, getAnswerList } from '../../../api/question'
import { Qtag } from '../../../global'
@Component({
  components: { 
    emptyBox,
    tabs,
    questionItem
  }
})
export default class extends Vue {
  private asks: Iquestion[] = []
  private tabs: Qtag[] = [
    { value: '我的问题', label: '0'},
    { value: '我回答的', label: '1'},
  ]
  private async selectNav(event: Qtag) {
    if (event.label === '1') {
      const { data } = await getAnswerList({author: this.$route.query.author})
      this.asks = data
    } else {
      this.getList()
    }
  }
  deleteAsk(item: string) {
    MessageBox.confirm(
      '您确定删除这个问题吗？删除之后可能无法找回了',
      '确定删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async () => {
      deleteAsk({ask_id: item})
      this.getList()
      Message({
        message: '删除成功',
        type: 'success',
        duration: 5 * 1000
      })
    })
  }
  private async getList () {
    const { data } = await getAskList({author: this.$route.query.author, articleTag: '全部', status: 0})
    this.asks = data
  }
  private async created() {
   this.getList()
  }
}
</script>

<style lang="scss" scoped>
.entry-nav {
  @include flexcenter($jc:space-between, $ai: center);
  padding: 2rem 1rem 2rem 2rem;
  border-bottom: 1px solid $border-color;
  color: $navcolor-header;
  &__title {
    font-size: 1.34rem;
    font-weight: bold;
    color: $title-color;
  }
}
</style>
