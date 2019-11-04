<template>
  <el-main class="article">
    <div class="entry-box" v-for="(article, index) in articles" :key="index">
      <div class="content-box">
        <div class="info-box">
          <article-title :article= article ></article-title>
          <div class="info-row title-row">{{ article.title }}</div>
          <div class="info-row action-row">
            <article-action :article= article></article-action>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import articleTitle from '../../articleTitle/index.vue'
import articleAction from '../../articleAction/index.vue'
import { IArticleData } from '../../../api/types'

@Component({
  name: 'homeArticle',
  components: {
    articleTitle,
    articleAction
  },
})

export default class extends Vue {
  @Prop({ required: true }) private articles!: IArticleData[]
}
</script>

<style lang="scss" scoped>
.article {
  cursor: pointer;
  .el-main {
    margin: 0;
    padding: 0;
  }
  .content-box {
    background: #fff;
    border-bottom: 1px solid rgba(178,186,194,.15);
    width: 620px;
    height: 90px;
    padding: 14px 24px;
    &:hover {
      background: #fcfcfc;
    }
    .info-box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .info-row {
        color: #909090;
        font-size: 14px;
      }
      .meta-row {
        color: #b2bac2;
        .item {
          position: relative;
          &::after {
            content: "·";
            color: #b2bac2;
            margin: 0px 2px;
          }
        }
        .post {
          font-weight: 500;
          color: #b71ed7;
        }
      }
      .title-row {
        font-size: 17px;
        font-weight: 600;
        color: #2e3135;
      }
    }
  }
}
</style>