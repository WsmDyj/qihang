<template>
  <div class="info-row meta-row">
    <span class="item post">专栏</span>
    <span class="item author">{{ article.author }}</span>
    <span class="createtime">{{ article.createtime }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../api/types'

@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
}
</script>

<style lang="scss" scoped>
.info-row {
  cursor: pointer;
  color: #909090;
  font-size: 14px;
}
.meta-row {
  color: #b2bac2;
  .item {
    position: relative;
    &::after {
      content: "·";
      color: #b2bac2;
      margin: 0px 2px;
    }
  }
  .post {
    font-weight: 500;
    color: #b71ed7;
  }
}
</style>

