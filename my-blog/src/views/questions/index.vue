<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" :fixed-top= -236 :z-index= 9 :sticky-top="60">
      <div class="navigation" :class="{'navigation-fixed': !visible}" >
        <div class="navigation-content">
          <el-tabs @tab-click="filterAsk" class="nav-list" v-model="activeIndex">
          <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.value" :name="item.label">
          </el-tab-pane>
        </el-tabs>
        </div>
      </div>
    </sticky>
    <div class="main mg-top-126">
      <div class="section">
        <div class="questions-nav">
          <div class="question-nav__tabs">
            <tabs :tabs = tabs @click="selectNav" />
          </div>
          <router-link target="_blank" to="/ask" class="questions-nav__button mobile-none">
            <i class="el-icon-plus"></i>
            <span>提问</span>
          </router-link>
        </div>
        <div class="questions-content">
          <div v-if="isEmpty" class="questions-empty">
            <van-empty description="这里空空如也" />
          </div>
          <van-list v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad" >
            <div v-for="(ask, index) in asks" :key="index">
              <question-item :ask = ask />
            </div>
          </van-list>
        </div>
      </div>
      <div class="asside">
        <!-- <totalCard /> -->
        <hotCard :hotList= hotList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import tabs from '../../components/tabs/index.vue'
import hotCard from '../../components/card/hot/index.vue'
import totalCard from './components/total.vue'
import questionItem from './components/item.vue'
import { Iquestion } from '../../api/types'
import { getAskList, getAskListHot } from '../../api/question'
import Sticky from '@/components/Sticky/index.vue'
import { TAG_LIST, TAG_QUESTION, Qtag } from '../../global'

export interface Ifilters {
  articleTag: string
  page: number
  status: string
}

@Component({
  name:'question',
  components: {
    Header,
    tabs,
    questionItem,
    hotCard,
    totalCard,
    Sticky,
  },
})

export default class extends Vue {
  private visible: boolean = true
  private activeIndex: string = '0'
  private hotList: Iquestion[] = []
  private options: Qtag[] = TAG_LIST
  private tabs: Qtag[] = TAG_QUESTION
  private asks: Iquestion[] = []

  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false

  private filters: Ifilters = { articleTag: '全部', page: 0, status: '0' }

  private filterAsk() {
    this.filters.articleTag = this.options.filter(item => item.label == this.activeIndex)[0].value
    this.fetchData()
  }

  private selectNav(tab: Qtag){
    this.filters.status = tab.label
    this.fetchData()
  }

  private onLoad() {
    this.filters.page = this.filters.page + 1
    this.fetchData()
  }

  private async fetchData() {
    this.loading = true
    this.filters.page = 0
    this.asks = []
    this.noMore = false
    this.isEmpty = false
    const { data } = await getAskList(this.filters)
    if (data.length > 0) {
      this.loading = false
      this.asks = this.asks.concat(data)
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }

  private async created() {
    this.fetchData()
    let hotList = await getAskListHot()
    this.hotList = hotList.data
  }
  
  private handleScroll(event: boolean) {
    this.visible = event
  }
}
</script>

<style lang="scss" scoped>
.questions-nav {
  padding: 1.3rem 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
  background: #fff;
  @include flexcenter($jc: space-between, $ai: center);

  &__button {
    color: $primary;
    cursor: pointer;
    padding: 0 1rem;
    font-size: 1.2rem;
    letter-spacing: 1px;
    font-weight: bold;
  }
}
.questions-empty {
  background: #fff;
}
</style>
