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
import uploadAvatar from '../../components/setting/uploadAvatar/index.vue'

interface article {
  article_id: string
  title: string
  content: string
  createtime: Date
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
  private content = ''
  private title: string = ''
  private html: string = ''
  private imgUrl: string = ''
  private height: number = document.documentElement.clientHeight - 68
  get avatar() {
    return UserModule.avatar
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
      markdown: this.content,
      articleImg: this.imgUrl
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
