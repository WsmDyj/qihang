<template>
  <div class="card">
    <div class="card-img">
      <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
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
