<template>
  <div @click="handleClick(list)" class="share">
    <div class="share-img">
      <el-image fit="cover" class="share-img" :src='list.imgUrl' ></el-image>
    </div>
    <div class="share-content">
      <div class="share-title">{{ list.title }}</div>
      <div class="share-desc">{{ list.describe }}</div>
      <div class="share-location">
        <div class="share-origin">
          <i class="el-icon-location-outline"></i>
          <span class="origin-name">{{ list.origin }}</span>
        </div>
        <div class="share-check">点击查看</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { IVideo } from '../../../api/types'
@Component({
  name: 'share',
})

export default class extends Vue {
  @Prop() private list!: IVideo
  private handleClick(list: IVideo) {
    window.open(list.location, '_blank')
  }
}
</script>

<style lang="scss">
.share {
  width: 230px;
  height: 270px;
  background: #fff;
  @include hoverState();
  margin-bottom: 2rem;
  box-sizing: border-box;
  @media only screen and (max-width: 750px) { 
    width: calc((100vw - 3.4rem)/2);
    height: 250px;
  }
  .share-img {
    width: 100%;
    height: 120px;
  }
  
  .share-content {
    padding: 20px 12px 15px;
    height: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media only screen and (max-width: 750px) { 
      height: 120px;
    }
    .share-title {
      @include nowrap();
      font-size: 1.142857rem /* 16/14 */;
      color: #07111b;
      font-weight: 700;
      cursor: pointer;
    }
    .share-desc {
      color: #333;
      font-size: 12px;
      line-height: 1.3;
      cursor: default;
      @include twoLines();
    }
    .share-location {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      .origin-name {
        font-size: 12px;
        margin-left: 5px;
      }
      .share-check {
        color: #fff;
        width: 80px;
        height: 25px;
        line-height: 25px;
        font-size: .857143rem /* 12/14 */;
        border-radius: 2.142857rem /* 30/14 */;
        background-color: #4d91fd;
        color: #fff;
        text-align: center;
        @media only screen and (max-width: 750px) { 
          width: 70px;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
