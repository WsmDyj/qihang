<template>
  <div class="container">
    <Header :visible= visible />
    <nav :class="visible ? 'navigation': 'top navigation'" >
      <div class="nav-list">
        <el-tabs v-model="activeIndex">
          <el-tab-pane v-for="(item, index) in actions" :key="index" :label="item.value" :name="item.laber">
          </el-tab-pane>
        </el-tabs>
      </div>
    </nav>
    <div class="main">
      <div class="article">
        <videoCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import videoCard from '../../components/videoCard/index.vue'
import debounce from '../../utils/debounce'
import rankingCard from '@/components/card/rankingCard/index.vue'
@Component({
  components: {
    Header,
    videoCard,
    rankingCard,
  }
})
export default class extends Vue {
  private radio:number = 0
  private activeIndex: string = '0'
  private visible: boolean = true
  private actions: any[] = [
    { value: '首页推荐', laber: '0' },
    { value: '最新发布', laber: '1' },
    { value: '上升最快', laber: '2' },
  ]
  // private options: any[]= [
  //   { value: '全部', laber: '0' },
  //   { value: 'Vue.js', laber: '1' },
  //   { value: 'React.js', laber: '2' },
  //   { value: 'Node.js', laber: '3' },
  //   { value: 'JavaScript.js', laber: '4' },
  //   { value: 'Flutter.js', laber: '5' },
  //   { value: 'Webpack.js', laber: '6' },
  //   { value: 'TypeScript', laber: '7' },
  //   { value: '性能优化', laber: '8' },
  //   { value: '微信小程序', laber: '9' },
  // ]
  private handleScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 136 * 2) {
      this.visible = false
    } else {
      this.visible = true
    }
    
  }
  private mounted() {
    window.addEventListener('scroll',  debounce(this.handleScroll, 200))
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
    transform: translateZ(0);
    top: 60px;
    width: 100%;
    height: 46px;
    z-index: 9;
    line-height: 46px;
    padding: 0 5px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    transition: all .2s;
    background: #fff;
    cursor: pointer;
    .nav-list {
      display: flex;
      justify-content: space-between;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      width: 960px;
      margin: 0 auto;
    }
  }
  .top {
    transform: translate3d(0,-60px,0);
  }
  .main {
    width: 1000px;
    margin-top: 136px;
    // .article {
    //   width: 1000px;
    //   display: flex;
    //   align-content: flex-start;
    //   flex-wrap:wrap;
    // }
  }
}
</style>
