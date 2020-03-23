<template>
 <!-- <transition name="el-fade-in-linear"> -->
    <div v-show="loading" class="loading">
      <div class="loading-title"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row animation-delay"></div>
      <div class="loading-bottom">
        <span class="author-avatar"></span>
        <span class="author-name"></span>
      </div>
      <!-- <div class="loading-img"></div> -->
    </div>
 <!-- </transition> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({default: false}) loading!: boolean
}
</script>

<style lang="scss" scoped>
.loading {
  background: #fff;
  border-width: 0;
  border-radius: 3px;
  padding: 20px 24px;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.22);
  position: relative;
  .loading-title {
    background-color: #eaeaea;
    height: 14px;
    width: 30%;
    margin-bottom: 20px;
  }
  .loading-bottom {
    padding-top: 10px;
    .author-avatar {
      display: inline-block;
      vertical-align: middle;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background-color: #eaeaea;
    }
    .author-name {
      display: inline-block;
      vertical-align: middle;
      background-color: #eaeaea;
      height: 14px;
      width: 40px;
      margin-left: 15px;
    }
  }
  .loading-img {
    position: absolute;
    right: 24px;
    top: 20px;
    width: 140px;
    height: 130px;
    border-radius: 4px;
    background-color: #eaeaea;
  }
}
.skeleton-row {
  width: 50%;
  height: 14px;
  background-color: #eaeaea;
  background-size: 480px 480px;
  margin-bottom: 10px;
  animation: loading 1s ease-in-out infinite;
}
.animation-delay {
  animation: loading 1s ease-in-out -.5s infinite;
}
@keyframes loading{
  0% {
    width: 50%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 50%;
  }
}
</style>
