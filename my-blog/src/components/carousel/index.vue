<template>
  <div class="carousel">
    <el-carousel :interval = 4000 trigger="click" height="280px">
      <el-carousel-item v-for="(item, index) in lists" :key="index">
        <div class="carousel-content">
          <el-image style="border-radius:4px;width: 668px; height: 300px" :src = item.img></el-image>
          <div class="carousel-panel">
            <div class="carousel-title">{{item.title}}</div>
            <div class="carousel-info">
              <span class="carousel-name">{{item.author}}</span>
              <span class="split-line">—</span>
              <span class="carousel-time">{{item.time}}</span>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  private lists: any = [
    {
      title: 'Go语言实现微服务工具链(一) - 蓝绿部署',
      author: '张三',
      time: '3月前',
      img: 'https://linmi.cc/wp-content/themes/Linmi/timthumb.php?src=https://linmi.cc/wp-content/uploads/2019/09/2019093006321992.png&h=400&w=800&zc=1&a=c&q=100&s=1'
    },
    {
      title: '轻松理解webpack热更新原理',
      author: '李四',
      time: '1月前',
      img: 'https://linmi.cc/wp-content/themes/Linmi/timthumb.php?src=https://linmi.cc/wp-content/uploads/2019/09/2019091421090960.png&h=400&w=800&zc=1&a=c&q=100&s=1'
    },
    {
      title: '样本组成了整体，特例装裱了样本',
      author: '王五',
      time: '5月前',
      img: 'https://linmi.cc/wp-content/themes/Linmi/timthumb.php?src=https://linmi.cc/wp-content/uploads/2019/08/cropped-2019082619190723.png&h=400&w=800&zc=1&a=c&q=100&s=1'
    }
  ]
}
</script>

<style lang="scss" scoped>
.carousel {
  height: 280px;
  width: 668px;
  background: #fff;
  border-radius: 4px;
  .carousel-content {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: default;
    .carousel-panel {
      height: 124px;
      position: absolute;
      padding: 24px;
      box-sizing: border-box;
      border-radius: 4px;
      z-index: 99;
      bottom: 0;
      width: 100%;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: linear-gradient(to bottom,rgba(6,6,8,0),rgba(6,6,8,.8));
      .carousel-title {
        font-size: 26px;
        font-weight: 600;
      }
      .carousel-info {
        color: rgba(255,255,255,.5);
        .carousel-name {
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          vertical-align: middle;
        }
        .split-line {
          padding: 0 10px;
        }
        .carousel-time {
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
