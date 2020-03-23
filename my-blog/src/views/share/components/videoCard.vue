<template>
  <div @click="handleClick(list)" class="share">
    <div class="share-img">
      <el-image fit="cover" style=" border-radius: 2px;width: 230px; height: 120px" :src='list.imgUrl' ></el-image>
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
  border-radius: 2px;
  @include hoverState();
  margin: 0 10px 20px 2px;
  box-sizing: border-box;
  &:nth-child(4n) {
    margin-right: 0px;
  }
  .share-content {
    padding: 20px 12px 15px;
    height: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .share-title {
      @include nowrap();
      font-size: 16px;
      color: #07111b;
      font-weight: 700;
      cursor: pointer;
    }
    .share-desc {
      color: #333;
      font-size: 12px;
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
        width: 100px;
        height: 25px;
        font-size: 12px;
        border-radius: 30px;
        background-color: #4d91fd;
        line-height: 25px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
