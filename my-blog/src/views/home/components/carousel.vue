<template>
  <div class="carousel">
    <el-carousel :interval = 4000 trigger="click" height="270px">
      <el-carousel-item v-for="(item, index) in lists" :key="index">
        <div class="carousel-content" @click="checkArticle(item)">
          <el-image fit="contain" style="border-radius:4px;width: 700px; height: 270px" :src = item.img></el-image>
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
import { IArticleData } from '../../../api/types'

@Component
export default class extends Vue {
  private lists: any = [
    {
      title: '一点感悟：当走完所有大厂的实习面试后',
      author: '等风来',
      time: '上周',
      article_id: '18u4gt2bddvk00',
      img: 'https://img11.360buyimg.com/imagetools/jfs/t1/116052/22/3948/28555/5eaa9c4cEf2248e4b/7c31d8a4fa41ec30.png'
    },
    {
      title: '国庆七天乐，Node来敲门',
      author: '等风来',
      time: '1月前',
      article_id: '4bneh4byxho000',
      img: 'https://img12.360buyimg.com/imagetools/jfs/t1/116636/25/3917/51487/5eaa9c61E71f105e1/969fe82f034f650d.png'
    },
    {
      title: '给你的网站添加第三方登录以及短信验证功能',
      author: '等风来',
      time: '1月前',
      article_id: '1otgby3dsc5c00',
      img: 'https://img11.360buyimg.com/imagetools/jfs/t1/116375/32/3931/166684/5eaa9c6eEde6cb991/a562315f39e599ce.png'
    }
  ]
  private checkArticle(article: IArticleData) {
    window.open(`/article?articleId=${article.article_id}`, '_blank')
  }
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
