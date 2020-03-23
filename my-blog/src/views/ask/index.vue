<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="ask-content">
        <div class="ask-title">
          <el-input type="text" size="medium" v-model="filters.title" placeholder="请输入问题的标题"></el-input>
          <div @click="submitAsk" class="public-ask">
            <el-button type="primary">发布问题</el-button>
          </div>
        </div>
        <div class="ask-tags">
          <popoverTag @select = selectTags />
        </div>
        <div class="markdown">
          <markdown-editor 
          ref="markdownEditor"
          :height = 486
          v-model="filters.markdown"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import MarkdownEditor from '@/components/markdownEditor/index.vue'
import popoverTag from './popoverTag/index.vue'
import { IAskData, Itag } from '../../api/types'
import GenNonDuplicateID from '../../utils/createId'
import { createAsk } from '../../api/question'
import { html_decode } from '../../utils/formateArticle'
import { detailAsk, updateAsk } from '../../api/question'

@Component({
  components: {
    Header,
    popoverTag,
    MarkdownEditor
  },
})

export default class extends Vue {
  private filters: IAskData = {
    question_id: GenNonDuplicateID(),
    title: '',
    articleTag: [],
    content: '',
    markdown: '',
  }
  private askId!: string | (string | null)[]
  private selectTags(tags: Itag[]) {
    this.filters.articleTag = tags
  }

  private async submitAsk() {
    this.filters.markdown = html_decode(this.filters.markdown)
    this.filters.title = html_decode(this.filters.title)
    this.filters.content =  html_decode((this.$refs.markdownEditor as MarkdownEditor).getHtml())
    if (this.filters.title !=='' && this.filters.markdown != '' && this.filters.articleTag.length >0) {
      if (this.askId) {
        await updateAsk(this.filters)
      } else {
        await createAsk(this.filters)
      }
      this.$router.push({path: '/questions'})
    } else {
      this.$message.error('标题、标签、内容 不为空！')
    }
  }

  private async created() {
    this.askId = this.$route.query.askId
    if (this.askId) {
      const { data } = await detailAsk({ask_id: this.askId})
      this.filters.markdown = data.markdown
      this.filters.title =  data.title
      this.filters.articleTag = data.articleTag
      this.filters.question_id = data.question_id
    }
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
    .ask-content {
      width: 100%;
      .ask-title {
        display: flex;
        align-items: center;
        .public-ask {
          margin-left: 70px;
        }
      }
      .ask-tags {
        margin: 20px 0;
        display: flex;
      }
    }
  }
}
</style>
