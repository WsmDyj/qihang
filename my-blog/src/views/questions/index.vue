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
            <el-radio class="details" :label="1">已回答</el-radio>
            <el-radio class="details" :label="2">已解决</el-radio>
          </el-radio-group>
          <el-link href="/ask" class="questions-ask" icon="el-icon-plus" type="primary">提问</el-link>
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
import hotCard from '../../components/card/hot/index.vue'
import totalCard from './components/total.vue'
import questionItem from './components/item.vue'
import { Iquestion } from '../../api/types'
import { getAskList, getAskListHot } from '../../api/question'
import Sticky from '@/components/Sticky/index.vue'
import { TAG_LIST, Qtag } from '../../global'

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
    totalCard,
    Sticky,
  },
})

export default class extends Vue {
  private visible: boolean = true
  private activeIndex: string = '0'
  private hotList: Iquestion[] = []
  private options: Qtag[] = TAG_LIST
  private asks: Iquestion[] = []

  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false

  private filters: Ifilters = { articleTag: '全部', page: 0, status: 0 }

  private filterAsk() {
    this.filters.page = 0
    this.asks = []
    this.noMore = false
    this.isEmpty = false
    this.filters.articleTag = this.options.filter(item => item.laber == this.activeIndex)[0].value
    this.fetchData()
  }

  private onLoad() {
    this.filters.page = this.filters.page + 1
    this.fetchData()
  }

  private async fetchData() {
    this.loading = true
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
    width: 994px;
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
  margin-top: 126px !important;
  .questions-container {
    width: 730px;
    .questions-nav {
      padding: 15px 20px 15px 15px;
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);
      background: #fff;
      display: flex;
      justify-content: space-between;
      .questions-ask {
        @media only screen and (max-width: 750px) { 
          display: none
        }
      }
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
.questions-empty {
  background: #fff;
}
</style>
