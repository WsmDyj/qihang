<template>
 <!-- <transition name="el-fade-in-linear"> -->
    <div v-show="loading" class="loading">
      <div class="loading-title"></div>
      <div class="skeleton-row"></div>
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
  margin-bottom: 18px;
  padding: 20px 24px;
  position: relative;
  .loading-title {
    background-color: #eaeaea;
    height: 14px;
    width: 20%;
    margin-bottom: 20px;
    animation: title 1s ease-in-out -.5s infinite;
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
@keyframes title{
  0% {
    width: 20%;
  }
  50% {
    width: 30%;
  }
  100% {
    width: 20%;
  }
}
</style>
