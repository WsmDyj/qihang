<template>
  <div class="article" @click="checkArticle(article)">
    <div class="article-img" v-show="article.articleImg">
      <el-image fit="cover" style="border-radius: 3px;width: 192px; height: 158px" :src = article.articleImg ></el-image>
    </div>
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.content}}</div>
      <div class="article-info">
        <div class="article-author">
          <div class="author-info">
            <el-popover
              :open-delay= 300
              trigger="hover">
              <authorCard :userInfo = article.author />
              <div slot="reference">
                <span class="author-avatar">
                  <el-avatar size="small" :src="article.author.avatar"></el-avatar>
                </span>
                <span class="author-name">{{article.author.nickname}}</span>
              </div>
            </el-popover>
          </div>
          <i class="iconfont">&#xe794;</i>
          <span class="article-tag" v-for="(tag, index) in article.articleTag" :key="index">{{tag}}</span>
        </div>
        <div class="article-action">
          <span class="action-item">
            <i class="iconfont">&#xe60d;</i>
            <span class="count">{{article.reviews}}</span>
          </span>
          <span class="action-item">
            <i class="iconfont">&#xe610;</i>
            <span class="count">{{article.comments}}</span>
          </span>
          <span class="action-item">
            <i class="iconfont" v-if="!article.islike">&#xe61b;</i>
            <i class="iconfont" v-else :style="{color: article.islike ? '#6cbd65' : '' }">&#xe60c;</i>
            <span class="count" :style="{color: article.islike ? '#6cbd65' : '' }">{{article.likeCount}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorCard from '../authorCard/popoveCard/index.vue'
import { IArticleData } from '../../api/types'

@Component({
  components: {
    authorCard
  }
})
export default class extends Vue {
  @Prop() private article!: IArticleData

  private checkArticle(article: IArticleData) {
    window.open(`/article?articleId=${article.article_id}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.article {
  width: 620px;
  padding: 12px 24px;
  background: #fff;
  border-width: 0;
  border-radius: 3px;
  margin-bottom: 18px;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.22);
  transition: all .2s linear;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  cursor: default;
  display: flex;
  .article-img {
    width: 193px;
    height: 158px;
    border-radius: 3px;
    margin-right: 20px;
    position: relative;
    &:hover:after{
      position:absolute;
      left: 0;
      top: 0;
      display: block;
      width:100%;
      height: 100%;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.2);
      content: attr(data-text);
    }
  }
  .article-content {
    height: 158px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .article-title {
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;//控制行数
      overflow:hidden;
      font-size: 20px;
      font-weight: 600;
      color: #2e3135;
      &:hover {
        color: $primary;
        text-decoration: underline !important;
      }
    }
    .article-desc {
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;//控制行数
      overflow:hidden;
    }
    .article-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .article-author {
        font-size: 13px;
        display: flex;
        align-items: center;
        .author-info {
          padding-right: 10px;
          cursor: pointer;
          .author-avatar {
            display: inline-block;
            vertical-align: middle;
            padding-top: 5px;
          }
          .author-name {
            display: inline-block;
            vertical-align: middle;
            padding-left: 12px;
          }
          &:hover {
            color: $primary;
          }
        }
        .iconfont {
          color: $primary;
          padding: 2px 5px 0 5px;
        }
        .article-tag {
          color: $primary;
          @include textRoundRight($color: $primary);
          &:last-child::after {
            content: none;
          }
        }
      }
      .article-action {
        font-size: 14px;
        color: $fontcolor;
        display: flex;
        width: 160px;
        justify-content: space-between;
        .action-item {
          .iconfont {
            font-size: 14px;
            padding:0 2px;
          }
          .count {
            padding: 0 2px;
          }
        }
      }
    }
  }
}
</style>
