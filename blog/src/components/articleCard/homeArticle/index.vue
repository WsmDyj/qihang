<template>
  <el-main class="article">
    <div class="entry-box" v-for="(article, index) in articles" :key="index">
      <div class="content-box">
        <div class="info-box">
          <article-tilte :article= article ></article-tilte>
          <div class="info-row title-row">{{ article.title }}</div>
          <div class="info-row action-row">
            <article-action @handleClick='getLike(article)' :article= article></article-action>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import articleTilte from '../../articleTitle/index'
import articleAction from '../../articleAction'
export default {
  components: {
    articleTilte,
    articleAction
  },
  props: {
    articles: {
      type: Array
    }
  },
  methods: {
    getLike(article) {
      console.log(article)
      article.likeCont += 1
    }
  }
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
