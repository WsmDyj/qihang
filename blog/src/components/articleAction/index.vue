<template>
  <div class="action-list">
    <div class="clickable likeBtn" @click="getLike">
      <i class="iconfont">&#xe60c;</i>
      <span class="count">{{ article.likeCont}}</span>
    </div>
      <div class="clickable commentBtn">
      <i class="el-icon-s-comment"></i>
      <span class="count">12</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
    }
  },
  methods: {
    getLike() {
      this.$emit('handleClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.action-list {
  font-size: 14px;
  display: flex;
  align-items: center;
  .clickable {
    width: 60px;
    border-radius: 1px;
    text-align: center;
    line-height: 24px;
    border: 1px solid #edeeef;
    white-space: nowrap;
    height: 24px;
    &:hover {
      background: #edeeef;
    }
  }
  .likeBtn {
    border-right: none;
    color: #6cbd65 !important;
  }
}
</style>
