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
import { deleteArticle, createArticle } from '../../api/blog'

interface article {
  title: string
  content: string
  createtime: Date
  author: string
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
  // private async created() {
  //   const { data } = await deleteArticle({id: '28'})
  //   this.content = data.markdown
  // }
  mounted() {
    window.scrollTo(0, 0)
    window.onresize = debounce(() => {
      this.height = document.documentElement.clientHeight - 66
    }, 400)
  }
  private async publish() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
    const newArticle: article = {
      title: this.title,
      content: this.html,
      createtime: new Date,
      author: 'zhangsan',
      markdown: this.content
    }
    await createArticle(newArticle)
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
