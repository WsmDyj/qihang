<template>
  <div class="container">
    <Header :visible= visible />
    <nav :class="visible ? 'navigation': 'top navigation'" >
      <div class="nav-content">
        <el-tabs class="nav-list" v-model="activeIndex">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane v-for="(item, index) in options" :key="index" :label="item.value" :name="item.laber">
          </el-tab-pane>
        </el-tabs>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            标签管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">前端</el-dropdown-item>
            <el-dropdown-item command="1">后端</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
    <div class="main">
      <div class="questions">
        <div class="questions-nav">
          <el-radio-group v-model="nav">
            <el-radio class="details" :label="0">全部</el-radio>
            <el-radio class="details" :label="1">未回答</el-radio>
            <el-radio class="details" :label="2">已解决</el-radio>
          </el-radio-group>
          <el-link href="/ask" icon="el-icon-plus" target="_blank" type="primary">提问</el-link>
        </div>
        
        <question/>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import question from '../../components/question/index.vue'
import debounce from '../../utils/debounce'
import { getArticleTags } from '../../api/blog'

@Component({
  name:'home',
  components: {
    Header,
    question
  },
})

export default class extends Vue {
  private nav: number = 0
  private visible: boolean = true
  private activeIndex: string = '0'
  private options: any[]= []
  private tags: any[] = []

  private async created() {
    const { data } = await getArticleTags()
    this.tags = data
    this.handleCommand('0')
  }
  private handleCommand(command: string) {
    this.options = this.tags[command].options
  }

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
    .nav-content {
      display: flex;
      justify-content: space-between;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      width: 960px;
      margin: 0 auto;
      .nav-list {
      }
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
    width: 932px;
    margin-top: 136px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .questions-nav {
      padding: 15px 20px 15px 12px;
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);
      background: #fff;
      box-sizing: border-box;
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
</style>
