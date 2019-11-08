<template>
  <div class="about">
    <card-module title="关于作者">
      <div class="card-body">
        <div class="author-info">
          <el-avatar :size="80" src ="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"></el-avatar>
          <span class="author-name">邬嗣敏</span>
        </div>
        <div class="author-desc">
          <span class="title">
            <i class="el-icon-collection"></i>
            Education
          </span>
          <span class="body">School of Software Engineering, Jiangxi University of Finance and Economics</span>
        </div>
        <div class="author-desc">
          <span class="title">
            <i class="el-icon-s-promotion"></i>
            Introduction
          </span>
          <span class="body">I just graduated from university and worked in JD. Like to make friends, love to share</span>
        </div>
       <div class="share">
          <el-tooltip class="share-item" effect="light"  placement="top">
            <el-image slot="content" fit="cover" style="width: 100px; height: 100px" src="//img10.360buyimg.com/devfe/jfs/t1/63440/36/11564/95224/5d8d7d19E27579e4d/54c8436a078201bf.jpg"></el-image>
            <svg width="21" height="18" t="1569552917798" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2648"><path d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" fill="#00C800" p-id="2649"></path><path d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="#00C800" p-id="2650"></path></svg>
          </el-tooltip>
          <div class="share-item" @click="toGithub">
            <svg width="21" height="18" viewBox="0 0 21 18" class="icon github-icon"><path data-v-335a593e="" fill="#161614" fill-rule="nonzero" d="M1.857 9.203c0 3.624 2.456 6.698 5.862 7.782.429.076.585-.177.585-.395 0-.194-.007-.71-.012-1.395-2.384.496-2.887-1.1-2.887-1.1-.39-.947-.952-1.2-.952-1.2-.778-.508.06-.498.06-.498.86.058 1.312.846 1.312.846.765 1.253 2.007.89 2.495.68.078-.529.3-.89.544-1.095-1.903-.207-3.904-.911-3.904-4.054 0-.896.334-1.628.882-2.201-.088-.208-.383-1.042.084-2.171 0 0 .72-.22 2.357.84a8.557 8.557 0 0 1 2.146-.276 8.566 8.566 0 0 1 2.146.277c1.636-1.062 2.354-.841 2.354-.841.468 1.129.174 1.963.086 2.17.55.574.881 1.306.881 2.202 0 3.15-2.004 3.844-3.913 4.047.307.253.581.754.581 1.52 0 1.096-.01 1.98-.01 2.25 0 .219.154.474.589.394C16.546 15.898 19 12.825 19 9.203 19 4.673 15.162 1 10.428 1c-4.733 0-8.57 3.672-8.57 8.203z"></path></svg>
          </div>
          <el-tooltip class="share-item" effect="light"  placement="top">
            <el-image slot="content" style="width: 100px; height: 100px" src="//img20.360buyimg.com/devfe/jfs/t1/67971/13/11436/176853/5d8d8091E01d0d34d/8b0fde8217a314d3.jpg"></el-image>
            <svg  width="21" height="18" t="1569553020356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6945"><path d="M511.500488 512.499512m-511.500488 0a511.500488 511.500488 0 1 0 1023.000976 0 511.500488 511.500488 0 1 0-1023.000976 0Z" fill="#1BC1FA" p-id="6946"></path><path d="M784.234146 572.440976c8.178014 0 16.273108 0.253752 24.282287 0.728288-16.961436-38.434466-42.247742-69.886751-58.977405-90.331785 2.822244-8.482716 11.30496-56.536788-25.443153-90.453666v-2.827239c0-132.850263-96.103149-231.785647-214.822213-231.785647-118.717065 0-214.82521 96.107145-214.825209 231.785647v2.827239c-33.915879 33.915879-25.437159 81.969951-19.782681 90.453666-25.444152 28.265397-73.49223 87.62343-76.320469 155.461182 0 16.961436 2.827239 45.226833 11.305959 56.531794 11.305959 14.133198 39.570357-2.827239 62.186272-48.054073 5.650482 19.788675 19.78368 53.709549 50.876316 93.281905-50.876316 11.302962-65.009514 62.186271-48.049077 90.450669 11.305959 19.788675 39.570357 33.920874 87.624429 33.920874 78.496343 0 115.815899-19.378076 134.378771-35.711126C492.644901 814.680414 490.520976 800.136617 490.520976 785.233171c0-117.522232 131.500581-212.792195 293.71317-212.792195z" fill="#FFFFFF" p-id="6947"></path><path d="M514.925143 819.204995c5.654478 0 11.309955 2.82624 14.132199 5.649483 16.960437 16.960437 53.709549 39.575352 138.50674 39.575352 48.054072 0 76.320468-16.960437 87.625428-33.920874 16.960437-28.264398 2.827239-79.147707-48.054072-90.450669 31.092636-39.572355 45.225834-73.493229 50.881311-93.281905 19.787676 45.226833 50.881311 62.18727 62.186271 48.054073 2.827239-11.30496 5.650482-39.570357 5.650482-56.531794-1.93511-23.223321-8.508691-45.121936-17.337069-65.128398-8.009179-0.475536-16.104273-0.729288-24.282287-0.729287-162.212589 0-293.713171 95.269963-293.71317 212.792195 0 14.903446 2.123926 29.447243 6.147996 43.485533a88.18688 88.18688 0 0 0 4.122973-3.864226c2.827239-2.823243 8.481717-5.649483 14.133198-5.649483z" fill="#FFFFFF" opacity=".4" p-id="6948"></path></svg>
          </el-tooltip>
      </div>
      </div>
    </card-module>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'
  @Component({
  components: {
    cardModule
    },
  })
  export default class extends Vue {
    toGithub() {
      window.open ('https://github.com/WsmDyj', '_blank')
    }
  }
</script>
<style lang="scss" scoped>
.about {
  position: sticky;
  top: 80px;
  .author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .author-name {
      padding: 10px 0;
      color: #303133;
      font-weight: 600;
      font-size: 16px;
    }
  }
  .author-desc {
    display: flex;
    flex-direction: column;
    .title {
      color: #606266;
      font-weight: 600;
      padding: 10px 0;
      border-bottom: 1px solid #dfe6ec;
    }
    .body {
      color: #777;
      padding: 10px 0 ;
    }
  }
  .share {
    display: flex;
    justify-content: space-around;
    .share-item:hover {
      transition: .3s;
      transform: scale(1.5)
    }
  }
}
</style>
