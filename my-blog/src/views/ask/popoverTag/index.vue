<template>
  <div class="tag-container">
    <div class="select-tags">
      <el-tag v-for="(tag, index) in selectTags" :key="index" type="info" @close="closeTag(tag)" closable effect="dark">{{tag}}</el-tag>
    </div>
    <el-popover
      :visible-arrow = false
      width="320"
      trigger="click">
      <div style="padding: 10px 20px;" class="tags">
        <div style="margin-bottom: 10px; font-weight: 500;" class="tags-title">还可添加 {{tagCount}} 个标签：</div>
        <div class="tags-content">
          <el-button style="margin:5px" v-for="(tag, index) in tags" :key="index" @click="selectTag(tag)" :disabled='tag.disabled' type="info" plain size="mini" >{{tag.value}}</el-button>
        </div>
      </div>
      <el-button slot="reference" icon="el-icon-plus" size="medium">添加标签</el-button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { Itag } from '../../../api/types'

@Component
export default class extends Vue {
  private tagCount: number = 2
  private selectTags: string[] = []
  private tags: Itag[]= [
    { value: 'Vue.js', laber: '0', disabled: false },
    { value: 'React.js', laber: '1', disabled: false },
    { value: 'Node.js', laber: '2', disabled: false },
    { value: 'CSS', laber: '3', disabled: false },
    { value: 'JavaScript.js', laber: '4', disabled: false },
    { value: 'Flutter.js', laber: '5', disabled: false },
    { value: 'Webpack.js', laber: '6', disabled: false },
    { value: 'TypeScript', laber: '7', disabled: false },
    { value: 'Http', laber: '8', disabled: false },
    { value: '性能优化', laber: '9', disabled: false },
    { value: '微信小程序', laber: '10', disabled: false },
  ]

  private closeTag(tag: string) {
    this.tagCount  = this.tagCount + 1
    this.selectTags = this.selectTags.filter(item => item != tag)
    this.tags.forEach((item: Itag) => {
      item.disabled = item.value === tag ? false : item.disabled
    })
    this.$emit('select', this.selectTags)
  }

  private selectTag(tag: Itag) {
    if (this.tagCount > 0) {
      this.tagCount = this.tagCount - 1
      this.tags.forEach((item: Itag) => {
        item.disabled = item.laber === tag.laber ? true : item.disabled
      })
      this.selectTags.push(tag.value)
      this.$emit('select', this.selectTags)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  display: flex;
}
</style>
