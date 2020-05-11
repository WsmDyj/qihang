<template>
  <el-carousel class="carousel" :interval = 4000  trigger="click" height="100%">
    <el-carousel-item v-for="(item, index) in lists" :key="index">
      <div class="carousel-content" @click="checkArticle(item)">
        <el-image fit="contain" class="carousel-img" :src = item.img />
        <div class="carousel-panel">
          <div class="carousel-panel__title">{{item.title}}</div>
          <div class="carousel-panel__info">
            <span class="carousel-name">{{item.author}}</span>
            <span class="split-line">—</span>
            <span class="carousel-time">{{item.time}}</span>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
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
  height: 22.5rem /* 270/12 */;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  @media only screen and (max-width: 767px) { 
    height: 12rem;
  }
  .carousel-content {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: default;
  }
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .carousel-panel {
    height: 50%;
    position: absolute;
    padding: 2rem /* 24/12 */;
    box-sizing: border-box;
    border-radius: 2px;
    z-index: 9;
    bottom: 0;
    width: 100%;
    color: #fff;
    @include flexcolumn($jc:space-around, $ai: none);
    background: linear-gradient(to bottom,rgba(6,6,8,0),rgba(6,6,8,.8));
    @media only screen and (max-width: 767px) { 
      padding: 1rem 2rem;
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      @include nowrap();
      @media only screen and (max-width: 767px) { 
        font-size: 1.5rem;
      }
    }
    &__info {
      color: rgba(255,255,255,.5);
      font-size: 1.3rem;
      font-weight: bold;
      @media only screen and (max-width: 767px) { 
        font-size: 1rem;
      }
      .carousel-name {
        color: #fff;
        vertical-align: middle;
      }
      .split-line {
        padding: 0 1rem;
        vertical-align: middle;
      }
      .carousel-time {
        vertical-align: middle;
      }
    }
  }
}
</style>
