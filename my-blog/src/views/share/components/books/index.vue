<template>
  <div class="books">
  <div class="book" v-for="(book, index) in books" :key="index">
    <div class="book-img">
      <el-image fit="fill" style="width:100px;height:140px" :src="book.imgUrl">
      </el-image>
    </div>
    <div class="book-content">
      <div class="book-name">{{book.title}}</div>
      <div class="book-introduction">{{book.describe}}</div>
      <div class="book-rate">
        <span class="rate-label">推荐指数</span>
        <el-rate v-model= book.rate disabled text-color="#ff9900" score-template="{value}" />
      </div>
      <div :style="{'background': book.location ? '#5dcaad':'#c8c9cc'}" @click="checkBook(book.location)" class="share-check">{{book.location ? '免费试读' : '暂无资源'}}</div>
    </div>
  </div>
  <div class="divider">
    <span class="divider-split"></span>
    <span class="divider-content">书贵于精，不贵于多</span>
    <span class="divider-split"></span>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getSharelist } from '../../../../api/actions'

@Component
export default class extends Vue {
  private books:any = []
  private checkBook(url: string) {
    if (!url) {
      return
    }
    window.open(url,'_blank') 
  }
  private async created() {
    const { data } = await getSharelist({type: 'book'})
    this.books = data
  }
}
</script>

<style lang="scss" scoped>
.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.book {
  display: flex;
  padding: 20px 15px;
  width: 476px;
  background: #fff;
  border-radius: 2px;
  @include hoverState();
  margin-bottom: 20px;
  box-sizing: border-box;
  @media only screen and (max-width: 1024px) { 
    width: 100%;
  }
  .book-img {
    width: 100px;
    height: 140px;
    flex-shrink: 0;
    box-shadow: 3px 4px 12px 0 rgba(0,0,0,.2);
    overflow: hidden;
    background-color: #ccc;
    margin-right: 20px;
  }
  .book-content {
    cursor: default;
    .book-name {
      font-weight: 600;
      font-size: 16px;
    }
    .book-introduction {
      margin: 15px 0;
      font-size: 12px;
      line-height: 16px;
      @include twoLines($clamp: 3)
    }
    .book-rate {
      display: flex;
      font-size: 1rem;
      align-items: center;
      .rate-label {
        padding-right: 10px;
        color: $fontcolor;
      }
    }
    .share-check {
      position: absolute;
      cursor: pointer;
      right: 15px;
      bottom: 20px;
      margin-top: 10px;
      box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.1);
      border-radius: 3px;
      color: #fff;
      width: 100px;
      height: 25px;
      font-size: 13px;
      line-height: 25px;
      color: #fff;
      text-align: center;
    }
  }
}
.divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px 0;
  font-size: 1.083333rem;
  color: $navcolor;
  &-split {
    flex: 1;
    display: inline-block;
    height: 1px;
    background-color: $navcolor;
    opacity: .5;
    margin: 0 2rem;
  }
}
</style>
