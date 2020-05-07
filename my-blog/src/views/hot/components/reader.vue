<template>
  <div class="book">
    <div class="book-poster">
      <el-image fit="fill" style="width:138px;height:157px" src="https://img1.mukewang.com/5d5bd510000104f102940333.jpg"></el-image>
    </div>
    <div class="book-info">
      <span class="info-title">{{ article.title }}</span>
      <span class="info-desc">{{ article.content }}</span>
      <articleAction :article= article />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import articleAction from '../../home/components/articleAction.vue'
import { IArticleData } from '../../../api/types'

@Component({
  name: 'book',
  components: {
    articleAction
  }
})
export default class extends Vue {
  @Prop() private article!: IArticleData
}
</script>

<style lang="scss" scoped>
.book {
  display: flex;
  padding: 24px;
  box-sizing: border-box;
  cursor: pointer;
  .book-poster {
    width: 138px;
    height: 157px;
  }
  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
    flex: 1;
    .info-title {
      font-size: 20px;
      font-weight: 400;
      &:hover {
        color: $primary;
      }
    }
    .info-desc {
      @include twoLines();
      font-size: 13px;
      line-height: 16px;
      color: $fontcolor;
    }
  }
}
</style>
