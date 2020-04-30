<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" style="width:100%" :fixed-top= -236 :z-index= 9 :sticky-top="60">
      <nav :class="visible ? 'navigation': 'top navigation'" >
        <div class="question-content">
          <el-tabs @tab-click="filterAsk" class="nav-list" v-model="activeIndex">
            <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.value" :name="item.laber">
            </el-tab-pane>
          </el-tabs>
        </div>
      </nav>
    </sticky>
    <div class="main">
      
      <div class="questions-container">
        <div class="questions-nav">
          <el-radio-group @change="filterAsk" v-model="filters.status">
            <el-radio class="details" :label="0">全部</el-radio>
            <el-radio class="details" :label="1">未回答</el-radio>
            <el-radio class="details" :label="2">已解决</el-radio>
          </el-radio-group>
          <el-link href="/ask" icon="el-icon-plus" type="primary">提问</el-link>
        </div>
        <div class="questions-content" v-for="(ask, index) in asks" :key="index">
          <question-item :ask = ask />
        </div>
        <div v-if="loading" element-loading-spinner="el-icon-loading" v-loading="loading" class="article-bottom__loading"></div>
        <div v-if="asks.length <= 0">
          <emptyBox tootip='这里空空如也' />
        </div>
      </div>
       <div class="asside">
        <!-- <askCard /> -->
        <hotCard :hotList= hotList />
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import hotCard from '../../components/card/hot/index.vue'
import askCard from '../../components/card/ask/index.vue'
import questionItem from './components/item.vue'
import debounce from '../../utils/debounce'
import { getArticleTags } from '../../api/blog'
import { Itag, Iquestion } from '../../api/types'
import { getAskList, getAskListHot } from '../../api/question'
import Sticky from '@/components/Sticky/index.vue'
import emptyBox from '@/components/emptyBox/index.vue'

export interface Ifilters {
  articleTag: string
  page: number
  status: number
}

@Component({
  name:'question',
  components: {
    Header,
    questionItem,
    hotCard,
    askCard,
    Sticky,
    emptyBox,
  },
})

export default class extends Vue {
  private visible: boolean = true
  private activeIndex: string = '0'
  private hotList: Iquestion[] = []
  private options: Itag[]= []
  private asks: Iquestion[] = []
  private loading: boolean = false
  private filters: Ifilters = { articleTag: '全部', page: 0, status: 0 }

  private filterAsk() {
    this.filters.page = 0
    this.filters.articleTag = this.options.filter(item => item.laber == this.activeIndex)[0].value
    document.documentElement.scrollTop = 0
    this.getAsklists()
  }

  private async created() {
    await this.getAsklists()
    let hotList = await getAskListHot()
    this.hotList = hotList.data
    const { data } = await getArticleTags()
    data[0].options.unshift({ laber: '0', value: '全部' })
    this.options = data[0].options
    
  }

  private async getAsklists() {
    const { data } = await getAskList(this.filters)
    this.asks = data 
  }
  
  private handleScroll(event: boolean) {
    this.visible = event
  }

  private async lazyLoading () { // 滚动到底部，再加载的处理事件
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.documentElement.scrollHeight 
    if (scrollTop + clientHeight >= scrollHeight) { // 如果滚动到接近底部，自动加载下一页
      this.filters.page = this.filters.page + 1
      const { data } = await getAskList(this.filters)
      this.asks = this.asks.concat(data)
      if (data.length < 15) {
        window.removeEventListener('scroll', this.lazyLoading) 
      }
    }
  }

  public mounted() {
    window.addEventListener('scroll', this.lazyLoading) 
  }

  public beforeDestroy() {
    window.removeEventListener('scroll', this.lazyLoading) 
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .navigation {
    position: fixed;
    top: 60px;
    width: 100%;
    height: 46px;
    z-index: 9;
    line-height: 46px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    transition: all .2s;
    background: #fff;
    cursor: pointer;
    .question-content {
      display: flex;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      width: 964px;
      margin: 0 auto;
      .el-dropdown-link {
        cursor: pointer;
        color: $navcolor;
        font-weight: 500;
      }
      .el-icon-arrow-down {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .top {
    transform: translate3d(0,-60px,0);
  }
  .main {
    width: 964px;
    margin-top: 126px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .questions-container {
      width: 700px;
      .questions-nav {
        padding: 15px 20px 15px 15px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);
        background: #fff;
        display: flex;
        justify-content: space-between;
        .details {
          position: relative;
          display: inline-block;
          &:nth-child(-n +2) {
            padding-right: 20px;
            @include splitLine($right:10px)
          }
        }
        .nav-ask {
          color: $primary;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    
  }
}
</style>
