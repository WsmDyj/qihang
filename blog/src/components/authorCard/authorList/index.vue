<template>
  <div class="container">
    <div class="author">
      <div class="author-avatar">
        <el-avatar :size="45" src ="https://user-gold-cdn.xitu.io/2018/3/25/1625c2608942e5bb?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"></el-avatar>
      </div>
      <div class="author-info">
        <div class="author-usernam">深红</div>
        <div class="author-desc">前端 @JD</div>
        <div class="author-desc">javascript 布道师</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.author {
  display: flex;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  box-sizing: border-box;
  .author-avatar {
    margin-right: 12px;
  }
  .author-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .author-usernam {
      color: #333;
      font-size: 14px;
    }
    .author-desc {
      color: #909090;
      font-size: 12px;
    }
  }
}
</style>