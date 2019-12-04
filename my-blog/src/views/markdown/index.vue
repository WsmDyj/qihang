<template>
  <div class="markdown">
    <div class="header">
      <el-input v-model="title" class="title" placeholder="请输入文章标题..."></el-input>
      <div class="author">
        <el-popover width="290">
          <div style="padding:24px;font-size: 18px;font-weight: 700; color: hsla(218,9%,51%,.8);" class="panel">
            <div class="title">添加封面大图
              <span v-show="imgUrl" @click="imgUrl=''" style="float:right"><i class="el-icon-delete-solid"></i></span>
            </div>
            <div style="width: 240px;margin-top:20px; height: 96px;line-height:96px;text-align:center;font-size: 16px;color: rgba(51,51,51,.4);background-color: hsla(0,0%,87%,.6);border: none;cursor: pointer;" class="upload">
              <div v-if="imgUrl">
                <el-image style="width: 240px; height: 96px" :src="imgUrl"></el-image>
              </div>
              <div v-else>
                <upload-avatar @upload='handleUpload'></upload-avatar>
              </div>
            </div>
          </div>
          <div slot="reference" class="toggle"><i class="el-icon-picture"></i></div>
        </el-popover>
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
      @input="getValue"
      :height = height
      v-model="markdown"
      />
    </div>
  </div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MarkdownEditor from '@/components/markdownEditor/index.vue'
import { UserModule } from '../../store/modules/user'
import debounce from '../../utils/debounce'
import { detailArticle, createArticle, updateArticle } from '../../api/blog'
import GenNonDuplicateID from '../../utils/createId'
import uploadAvatar from '../../components/setting/uploadAvatar/index.vue'

export interface article {
  article_id: string | (string | null)[]
  title: string
  content: string
  createtime?: Date
  author?: string
  markdown: string
  articleImg?: string
}

@Component({
  name: 'Markdown',
  components: {
    MarkdownEditor,
    uploadAvatar
  }
})
export default class  extends Vue {
  private markdown = ''
  private title: string = ''
  private value:string = ''
  private html: string = ''
  private imgUrl: string = ''
  private articleId!: string | (string | null)[]
  private height: number = document.documentElement.clientHeight - 68

  get avatar() {
    return UserModule.avatar
  }

  private getValue(event: string) {
    // 实时编写的值
  }
  
  @Watch('height', {immediate: true})
  private watchHeight(val: number) {
    this.height = val
  }
  // 封面大图
  private handleUpload(event: string) {
    this.imgUrl = event
  }
  private async created() {
    this.articleId = this.$route.query.articleId
    if (this.articleId) {
      const { data } = await detailArticle({id: this.articleId})
      this.markdown = data.markdown
      this.title =  data.title
      this.imgUrl = data.articleImg
    }
  }
  mounted() {
    window.scrollTo(0, 0)
    window.onresize = debounce(() => {
      this.height = document.documentElement.clientHeight - 66
    }, 400)
  }
  html_decode(str:string) {
    let s: string = ''
    if (str.length === 0) return ''
    s = str.replace(/</g, "<")
    s = s.replace(/>/g, ">")
    s = s.replace(/ /g, " ")
    s = s.replace(/'/g, "'\'")
    s = s.replace(/"/g, "'\'")
    return s
  }
  private async publish() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
    const result = this.html_decode(this.markdown)
    const _html = this.html_decode(this.html)
    const newArticle: article = {
      article_id: this.articleId,
      title: this.title,
      content: _html,
      markdown: result, // 反编译存入数据库
      articleImg: this.imgUrl
    }
    if(this.articleId) {
      await updateArticle(newArticle)
    } else {
      Object.assign(newArticle,{ article_id: GenNonDuplicateID(),createtime: new Date,})
      await createArticle(newArticle)
    }
    // this.$router.push({path: '/'})
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
      .panel {
        padding: 24px;
      }
      .toggle {
        font-size: 28px;
        color: #ddd;
        margin-right: 25px;
        cursor: pointer;
      }
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
