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

@Component({
  components: {
    Header,
    popoverTag,
    MarkdownEditor
  },
})

export default class extends Vue {
  private filters: IAskData = {
    title: '',
    tags: [],
    contnet: '',
    markdown: '',
    author: '',
  }
  private selectTags(tags: Itag[]) {
    this.filters.tags = tags
  }
  private submitAsk() {
    this.filters.contnet = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
    if (this.filters.title !=='' && this.filters.markdown != '' && this.filters.tags.length >0) {
      console.log(this.filters)
    } else {
      this.$message.error('请确保 标题、标签、内容 不为空！');
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
