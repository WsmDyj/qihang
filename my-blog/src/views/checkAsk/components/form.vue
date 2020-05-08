<template>
  <div class="form">
    <div class="markdown">
      <markdown-editor 
        ref="markdownEditor"
        mode="markdown"
        :height = 286
        v-model="markdown"
      />
    </div>
    <div class="sumbit">
      <el-button @click="submit" size='mini' type="primary">提交答案</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/markdownEditor/index.vue'
import { html_decode } from '../../../utils/formateArticle'

@Component({
  components: {
    MarkdownEditor
  },
})
export default class extends Vue {
  private markdown:string = ''
  private submit() {
    const content =  html_decode((this.$refs.markdownEditor as MarkdownEditor).getHtml())
    this.$emit('submit', content)
    this.markdown = ''
  }
}
</script>

<style lang="scss" scoped>
.form {
  height: 320px;
  padding: 1.428571rem /* 20/14 */;
  background: #fff;
  .sumbit {
    margin-top: 15px;
    float: right;
  }
  .markdown {
    .te-mode-switch-section {
      display: none !important;
    }
  }
}
</style>
