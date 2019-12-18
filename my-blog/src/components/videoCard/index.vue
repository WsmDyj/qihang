<template>
  <div class="card">
    <div class="card-img">
      <el-image fit="fill" src="data:image/jpeg;base64,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">
        <div slot="placeholder" class="image-slot">
          <img style="width:230px;height:100%;border-radius: 4px 4px 0 0;" src="../../assets/qh.png" alt="=占位符">
        </div>
      </el-image>
      <!-- <embed src="https://vswf.douyucdn.cn/share/vshare.swf?vid=yVmjvBZrQ05vqkNb" allowFullScreen="true" quality="high" width="230" height="158" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" /> -->
    </div>
    <div class="card-info">
      <div class="card-info-title">
        <el-tooltip 
          :visible-arrow = false
          placement="top" 
          :open-delay= 300 
          content="ICON设计的6个最基本的ICON设计的6个最基本的" 
          >
          <span class="title-content">ICON设计的6个最基本的ICON设计的6个最基本的</span>
        </el-tooltip>
        <span class="title-icon"></span>
      </div>
      <div class="card-info-type">文章-教程-UI</div>
      <div class="card-info-item">
        <span class="view">
          <i class="iconfont">&#xe60d;</i>
          4.4
        </span>
        <span class="comment">
          <i class="iconfont">&#xe610;</i>
          16</span>
        <span class="like">
          <i class="iconfont">&#xe61b;</i>
          256</span>
      </div>
    </div>
    <div class="card-item">
      <div class="card-author">
        <el-popover
          :open-delay= 300
          trigger="hover">
          <authorCard />
          <div slot="reference">
            <span class="author-avatar">
              <el-avatar :size="26" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </span>
            <span class="author-name">旅梦开发团</span>
          </div>
        </el-popover>
      </div>
      <div class="create-time">12个月前</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorCard from '../authorCard/popoveCard/index.vue'
@Component({
  components: {
    authorCard
  }
})
export default class extends Vue {
  
}
</script>

<style lang="scss" scoped>
.card {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 30px;
  width: 230px;
  height: 308px;
  background: #fff;
  border-radius: 4px;
  transition: all .2s linear;
  &:hover {
    margin-top: -5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .card-img {
    height: 158px;
    width: 230px;
    cursor: pointer;
    .el-image {
      height: 158px;
      border: none;
      width: 100%;
      border-radius: 4px 4px 0 0;
    }
  }
  .card-info {
    border-bottom: 1px solid #eee;
    padding: 10px 16px 13px;
    height: 75px;
    position: relative;
    &-title {
      position: relative;
      font-size: 16px;
      color: #2e3135;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      .title-content {
        width: 194px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: #027fff;
        }
      }
      .title-icon {
        display: inline-block;
        // width: 16px;
        // height: 16px;
        // background-image: url('../../assets/svg/hot.svg')
        // width: 10px;
        // height: 16px;
        // background-image: url('../../assets/svg/miniHot.svg')
        width: 14px;
        height: 16px;
        background-image: url('../../assets/svg/smallHot.svg')
      }
    }
    &-type {
      font-size: 12px;
      color: $fontcolor;
      margin-top: 8px;
      font-weight: 500;
    }
    &-item {
      font-size: 14px;
      color: #b2bac2;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      cursor: default;
      .iconfont {
        font-size: 16px;
      }
    }
  }
  .card-item {
    padding: 0 16px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-author {
      cursor: pointer;
      &:hover {
        color: #027fff;
      }
      .author-avatar {
        display: inline-block;
        vertical-align: middle;
      }
      .author-name {
        display: inline-block;
        vertical-align: middle;
        width: 104px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 10px;
        line-height: 50px;
      }
    }
    .create-time {
      font-size: 12px;
      color: #b2bac2;
    }
  }
}
</style>
