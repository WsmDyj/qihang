<template>
  <div class="carousel">
    <el-carousel :interval = 4000 trigger="click" height="270px">
      <el-carousel-item v-for="(item, index) in lists" :key="index">
        <div class="carousel-content">
          <el-image fit="cover" style="border-radius:4px;width: 700px; height: 270px" :src = item.img></el-image>
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
    // https://user-gold-cdn.xitu.io/2019/11/8/16e4a5f24fd1e188?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1
    // https://user-gold-cdn.xitu.io/2019/10/20/16de9710a4baee9f?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1
    {
      title: 'Go语言实现微服务工具链(一) - 蓝绿部署',
      author: '张三',
      time: '3月前',
      img: 'https://user-gold-cdn.xitu.io/2019/11/16/16e72b3afb20ac3a?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1'
    },
    {
      title: '轻松理解webpack热更新原理',
      author: '李四',
      time: '1月前',
      img: 'https://user-gold-cdn.xitu.io/2019/12/25/16f38e58b90d02c9?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
    },
    {
      title: '样本组成了整体，特例装裱了样本',
      author: '王五',
      time: '5月前',
      img: 'https://user-gold-cdn.xitu.io/2019/12/13/16efe9ed70b90636?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
    }
  ]
}
</script>

<style lang="scss" scoped>
.carousel {
  height: 270px;
  width: 700px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
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
