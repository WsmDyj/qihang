<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" style="width:100%" :fixed-top= -236 :z-index= 9 :sticky-top="60">
      <nav :class="visible ? 'navigation': 'top navigation'" >
        <div class="navigation-content">
          <el-tabs @tab-click="filterAsk" class="nav-list-share" v-model="activeIndex">
            <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.value" :name="item.laber">
            </el-tab-pane>
          </el-tabs>
        </div>
      </nav>
    </sticky>
    <div class="main">
      <div class="share-content">
        <div v-show="activeIndex == 0">
          <videoPane />
        </div>
        <div v-show="activeIndex == 1">
          <bookPane />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import { IVideo, Itag} from '../../api/types'
import Sticky from '@/components/Sticky/index.vue'
import videoPane from './components/video/index.vue'
import bookPane from './components/books/index.vue'
@Component({
  name: 'share',
  components: {
    Header,
    videoPane,
    bookPane,
    Sticky,
  }
})

export default class extends Vue {
  private activeIndex: string = '0'
  private visible: boolean = true

  private options: Itag[]= [
    {value: "视频推荐", laber: "0"},
    {value: "必读书单", laber: "1"},
    {value: "内推招聘", laber: "2"}
  ]
  
  
  private handleScroll(event: boolean) {
    this.visible = event
  }
  private filterAsk() {
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include flexcolumn($jc:center, $ai: center);
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
    .navigation-content {
      display: flex;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      width: 964px;
      margin: 0 auto;
    }
  }
  .top {
    transform: translate3d(0,-60px,0);
  }
  .main {
    width: 968px;
    margin-top: 126px;
    margin-bottom: 20px;
    position: relative;
  }
}
</style>
