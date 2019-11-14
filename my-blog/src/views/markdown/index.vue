<template>
  <div class="markdown">
    <div class="header">
      <el-input v-model="title" class="title" placeholder="请输入文章标题..."></el-input>
      <div class="author">
        <el-dropdown class="publish" >
          <span class="el-dropdown-link" @click="publish">
            <span>发布</span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">草稿</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-avatar slot="reference" size="medium" :src= avatar></el-avatar>
      </div>
    </div>
    
    <div class="markdown">
      <markdown-editor 
      ref="markdownEditor"
      :height = height
      v-model="content"
      />
    </div>
  </div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/markdownEditor/index.vue'
import { UserModule } from '../../store/modules/user'
import debounce from '../../utils/debounce'
import { detailArticle, createArticle } from '../../api/blog'
import GenNonDuplicateID from '../../utils/createId'

interface article {
  article_id: string
  title: string
  content: string
  createtime: Date
  author?: string
  markdown: string
}

@Component({
  name: 'Markdown',
  components: {
    MarkdownEditor
  }
})
export default class  extends Vue {
  private content = ''
  private title: string = ''
  private html: string = ''
  private height: number = document.documentElement.clientHeight - 68
  get avatar() {
    return UserModule.avatar
  }
  
  @Watch('height', {immediate: true})
  private watchHeight(val: number) {
    this.height = val
  }
  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    if (articleId) {
      const { data } = await detailArticle({id: articleId})
      this.content = data.markdown
      this.title =  data.title
    }
  }
  mounted() {
    window.scrollTo(0, 0)
    window.onresize = debounce(() => {
      this.height = document.documentElement.clientHeight - 66
    }, 400)
  }
  private async publish() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
    const newArticle: article = {
      article_id: GenNonDuplicateID(),
      title: this.title,
      content: this.html,
      createtime: new Date,
      markdown: this.content
    }
    await createArticle(newArticle)
    this.$router.push({path: '/'})
  } 
}
</script>

<style lang="scss">
.markdown {
  .header {
    width: 100%;
    background: #fff;
    height: 63px;
    display: flex;
    align-items: center;
    .title {
      width: 70%;
      margin-left: 20px;
      font-size: 24px;
    }
    .author {
      width: 30%;
      margin-right: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .publish {
        margin-right: 10%;
        white-space: nowrap;
        color: #007fff;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .el-input__inner {
      color: #000 !important;
      font-weight: 700;
      border: none;
      outline: none;
    }
  }
  
}

</style>
