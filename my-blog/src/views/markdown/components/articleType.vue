<template>
  <div class="type">
    <div class="type-title">发布文章</div>
    <div class="type-panel">
      <div class="panel-title">分类</div>
      <div class="panel-box">
        <el-radio-group v-model="radio" @change="change" size="mini">
          <el-radio v-for="(item, index) in articelType" :key="index" :label="item.label" border>{{item.value}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="type-panel">
      <div class="panel-title">标签</div>
      <el-select
        v-model="types.tags"
        :multiple-limit = 3
        multiple
        size="small"
        placeholder="请选择文章标签">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="publish">
      <el-button @click="sumbit" size="medium">确定并发布</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getArticleTags } from '../../../api/blog'

export interface Itag {
  label: string,
  value: string,
  options: object[]
}
export interface Itype {
  type: string,
  tags: string[]
}

export default class extends Vue {
  @Prop() private type !: Itype
  private radio: string = '1'
  private options: object[]  = []
  private articelType: Itag[] = []
  private types = {
    type: '前端',
    tags: []
  }

  // @Watch('type', {immediate: true})
  // private typeChange(old:Itag, val: Itag) {
  //   console.log(old, val)
  // }
  private change() {
    this.articelType.forEach((item: Itag) => {
      this.types.tags = []
      if (item.label == this.radio) {
        this.options = item.options
        this.types.type = item.value
      }
    })
  }

  private sumbit() {
    if (this.types.tags.length <= 0) {
      this.$message({ message: '请选择文章标签', type: 'error' })
    } else {
      this.$emit('submit', this.types)
    }
  }

  private async created() {
    const { data } = await getArticleTags()
    this.options = data[0].options
    this.articelType = data
  }
}
</script>

<style lang="scss" scoped>
.type {
  padding: 20px;
  .type-title {
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 700;
    color: hsla(218,9%,51%,.8);
  }
  .type-panel {
    margin-bottom: 20px;
    .panel-title {
      font-size: 16px;
      color: $fontcolor;
      margin-bottom: 10px;
    }
  }
  .publish {
    width: 240px;
    text-align: center;
  }
}
</style>
