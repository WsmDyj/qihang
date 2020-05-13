<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <articleAction :article= article />
      <skeleton v-if="loading"/>
      <div class="article section" v-else>
        <div class="article-header">
          <div class="article-header__info">
            <author-info :userInfo= article.author>
              <div slot="content">
                <span class="article-time">{{article.createtime}} </span>
                <span class="article-review">阅读 {{ article.reviews }} </span>
                <router-link v-if="nickname== article.author.nickname" :to="{path: '/markdown', query:{articleId: article.article_id}}">
                  <span class="article-edit">编辑</span>
                </router-link>
              </div>
            </author-info>
          </div>
          <div class="article-header__follow" v-show="nickname !== article.author.nickname">
            <author-follow size='mini' :author = article.author.nickname ></author-follow>
          </div>
        </div>
        <div class="article-img" v-if="article.articleImg">
          <el-image fit="cover" class="article-img" :src="article.articleImg"></el-image>
        </div>
        <div class="article-main">{{ article.title }}</div>
        <div ref="article" v-highlight>
          <div class="article-content" v-html="article.content"></div>
        </div>
        <div class="article-comment">
          <comment />
        </div>
      </div>
      <div class="asside">
        <achievement-card title= "关于作者" :userInfo= article.author />
        <sticky @scroll="handleScroll" :z-index= 9 :sticky-top="80" v-if='article.content !== ""'>
          <div ref="catalog">
            <catalog :catalog = catalog />
          </div>
        </sticky>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import comment from '@/components/comment/index.vue'
import catalog from './components/catalog.vue'
import achievementCard from '@/components/card/achievement/index.vue'
import authorFollow from '@/components/follow/index.vue'
import authorInfo from '@/components/authorInfo/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import articleAction from './components/action.vue'
import skeleton from './components/skeleton.vue'
import { detailArticle } from '../../api/blog'
import { getreviewArticle } from '../../api/actions'
import { IUserInfo, IArticleData } from '../../api/types'
import { getUserInfo } from '../../api/user'
import { UserModule } from '../../store/modules/user'
import { formatTime } from '../../utils/formatDate'
import toToc from '../../utils/catalog'
const defaultArticle = {
  articleImg: '',
  article_id: 0,
  author: '',
  title: '',
  content: '',
  createtime: '',
  likeCount: 0,
  comments: 0,
  reviews: 0,
  markdown: '',
}

@Component({
  components: {
    Header,
    comment,
    catalog,
    achievementCard,
    authorFollow,
    articleAction,
    authorInfo,
    Sticky,
    skeleton
  }
})
export default class  extends Vue {
  private article: IArticleData = defaultArticle
  private catalog: string = ''
  private loading: Boolean = true
  private linkLists!: NodeListOf<HTMLElement> 
  private target!: any[]
  private listHeight: number[] =[]

  get nickname() {
    return UserModule.nickname
  }

  @Watch('$route')
  private routechange(val: any) {
    const data = document.getElementsByClassName(`toc-link-${val.hash}`)[0] as Element
    this.linkLists.forEach((list:Element) => {
      data == list ? list.classList.add('active') : list.classList.remove('active') 
    })
  }

  private async changeArticle(articleId: any) {
    const { data } = await detailArticle({ id: articleId })
    const userInfo =  await getUserInfo({username: data.author})
    await (() => {this.loading = false})()
    data.createtime = formatTime(data.createtime)
    data.author = userInfo.data
    document.title = data.title // 设置页面的title
    const _toc: string[] = data.content.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
    if (_toc) {
      _toc.forEach((item: string, index: number) => {
        let _toc:string = `<div class='toc-title' id='${index}'>${item} </div>`
        data.content = data.content.replace(item, _toc)
      })
    }
    this.article = data
    this.catalog = toToc(_toc)
  }

  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    await getreviewArticle({article_id: articleId }) // 增加文章统计数
    await this.changeArticle(articleId)
    await this.$nextTick(async () => {
      await this.getTitleHeight()
      await this.getCataloglist()
    })
  }

  mounted() {
    window.addEventListener('scroll',this.handleScroll,true)
  }

// 获取每个文章标题的距顶部的高度
  private async getTitleHeight() {
    let titlelist = Array.prototype.slice.call((this.$refs.article as Element).getElementsByClassName('toc-title'))
    titlelist.forEach((item,index) => {
      this.listHeight.push(item.offsetTop)
    })
    this.listHeight.push(2 * (titlelist[titlelist.length-1].offsetTop))
  }
  // 获取目录的所有ul、a标签
  private async getCataloglist() {
    let catalogList = (this.$refs.catalog as Element).getElementsByClassName('catalog-list')
    this.linkLists = document.getElementsByName('link')
    this.target = Array.prototype.slice.call(catalogList)
  }

  private handleScroll() {
    const scrollY = window.pageYOffset
    for (let i = 0; i < this.listHeight.length-1; i++) {
      let h1: number = this.listHeight[i]
      let h2: number = this.listHeight[i + 1]
      if (scrollY >= h1 && scrollY <= h2) {
        const data: Element = document.getElementsByClassName(`toc-link-#${i}`)[0] as Element // 获取文章滚动到目录的目标元素
        this.linkLists.forEach((list: Element) => {
          let top: number = 0 
          top = i > 7 ? -28 * (i-7) : 0
          this.target[0].style.marginTop = `${top}px`
          data == list ? list.classList.add('active') : list.classList.remove('active') // 其他移除active
        })
      } 
    }
  }
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.article {
  position: relative;
  background: #fff;
  padding: 2rem;
  cursor: default;
  @media only screen and (max-width: 767px) { 
    padding: 1rem;
  }

  &-header {
    @include flexcenter($jc: space-between);
    margin-bottom: 10px;
    .article-time {
      letter-spacing: 1px;
      @include textRoundRight();
      font-size: 1.1rem;
      color: $fontcolor;
    }
    .article-edit {
      color: $primary;
      position: relative;
      @include textRound($color:'#409EFF');
    }
  }

  &-img {
    text-align: center;
    width: 95%;
    height: 267px;
    margin: 0 auto;
    @media only screen and (max-width: 750px) { 
      height: 180px;
    }
  }

  &-main {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.5;
    margin: .67em 0;
    @media only screen and (max-width: 750px) { 
      font-size: 20px
    }
  }
}
</style>
