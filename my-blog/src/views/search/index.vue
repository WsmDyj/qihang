<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="article">
        <div class="search-header">
          <div class="search-result">
            <div v-if="count > 0">
              总共搜到<span class="search-count"> {{count}} </span>条结果
            </div>
            <div v-else>抱歉！暂无搜索结果</div>
          </div>
          <div>
            <el-radio-group v-model="radio">
              <el-radio class="type" :label="0">文章</el-radio>
              <el-radio class="type" :label="1">作者</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="search-article" v-if="radio==0" >
          <div v-if="articles.length > 0">
            <article-list :articles = articles></article-list>
          </div>
          <div v-else>
            <emptyBox/>
          </div>
        </div>
        <div class="search-users" v-if="radio== 1">
          <div v-if="lists.length > 0">
            <author-list :lists = lists></author-list>
          </div>
          <div v-else>
            <emptyBox/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import articleList from '@/components/articleList/homeArticle/index.vue'
import authorList from '@/components/authorList/index.vue'
import { IArticleData, IFollow } from '../../api/types'
import formatDate from '../../utils/formatDate'
import { ArticleModule } from '../../store/modules/article'
import { UserModule } from '../../store/modules/user'
import { getSearch } from '../../api/blog'
import emptyBox from '@/components/emptyBox/index.vue'


@Component({
  name:'home',
  components: {
    Header,
    articleList,
    authorList,
    emptyBox
  },
})

export default class extends Vue {
  private articles: IArticleData[] = []
  private keyword: string | (string | null)[] = ''
  private radio: number = 0
  private lists: IFollow[] = []
  private count: number = 0

  keywordscolorful(str:string, key:any){
    var reg = new RegExp("(" + key + ")", "g")
    var newstr = str.replace(reg, "<font style='color: red;'>$1</font>")
   
    return newstr
  }
  private async created() {
    this.keyword = this.$route.query.keyword
    const { data } = await getSearch({keyword: this.keyword})
    this.articles = data.articles
    this.lists = data.users
    await this.getList()
    this.count = data.articles.length + data.users.length
  }
  get likeArticlId() {
    return ArticleModule.likeArticlId
  }
  private async getList() {
    this.articles.forEach((item: IArticleData) => {
      Object.assign(item, { islike: false })
      if (this.likeArticlId.indexOf(item.article_id) != -1) {
        item.islike = true
      }
    })
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

  .main {
    width: 932px;
    margin-top: 90px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search-header {
      display: flex;
      justify-content: space-between;
      height: 48px;
      background: #fff;
      line-height: 48px;
      padding: 0 24px;
      color: $fontcolor;
      width: 620px;
      cursor: pointer;
      border-bottom: 1px solid $border-bottom;
      .search-count {
        font-style: normal;
        color: #e8001c;
        font-size: 16px;
        font-weight: 600;
      }
      .type {
        padding-left: 10px;
        &:nth-child(-n+1):after {
          content: "";
          position: absolute;
          width: 1px;
          margin-top: -5px;
          top: 50%;
          right: -10px;
          height: 12px;
          background-color: #b2bac2;
          opacity: .8;
        }
      }
    }
  }
}
</style>
