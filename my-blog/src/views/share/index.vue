<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" :fixed-top= -236 :z-index= 9 :sticky-top="60">
      <div class="navigation" :class="{'navigation-fixed': !visible}" >
        <div class="navigation-content">
          <el-tabs @tab-click="filterAsk" class="el-tabs" v-model="activeIndex">
            <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.value" :name="item.label">
            </el-tab-pane>
          </el-tabs>
           <van-tabs @click="filterAsk" class="van-tabs" v-model="activeIndex">
            <van-tab v-for="(item, index) in options" :key="index" :title="item.value" :name="item.label" />
          </van-tabs>
        </div>
      </div>
    </sticky>
    <div class="main mg-top-126">
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
import { TAG_SHARE, Qtag } from '../../global'

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
  private options: Qtag[]= TAG_SHARE
  
  private handleScroll(event: boolean) {
    this.visible = event
  }
  private filterAsk() {
  }
}
</script>

<style lang="scss" scoped>

</style>
