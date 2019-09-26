<template>
  <div class="author">
    <div class="author-avatar">
      <el-avatar :size="90" :src = userInfo.avatar></el-avatar>
    </div>
    <div class="author-info">
      <div class="username">{{ userInfo.nickname }}</div>
      <div class="position">
        <div v-if="userInfo.job">
          <i class="el-icon-s-cooperation author-icon"></i>
          <span>{{ userInfo.job }} | {{ userInfo.company }}</span>
        </div>
        <div class="addInfo" v-else>
          <span>+ 你喜欢什么工作？</span>
        </div>
      </div>
      <div class="intro">
        <div v-if="userInfo.autograph">
          <i class="el-icon-s-order author-icon"></i>
          <span>{{ userInfo.autograph }}</span>
        </div>
        <div class="addInfo" v-else>
          <span>+ 你的人生格言是什么？</span>
        </div>
      </div>
    </div>
    <div class="author-action">
      <el-button type="primary" plain >编辑个人资料</el-button>
    </div>
  </div>
</template>
<script>
import store from '../../store'
import { mapState } from 'vuex';
export default {
  computed: mapState(["userInfo"]),
}
</script>
<style lang="scss" scoped>
.author {
  margin: 80px  auto 0 auto;
  padding: 30px;
  box-sizing: border-box;
  width: 708px;
  height: 153px;
  background: #fff;
  display: flex;
  align-items: center;
  .author-info {
    margin: 0px 24px 0 28px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .username {
      margin: 0;
      padding: 0;
      font-size: 28px;
      font-weight: 600;
      line-height: 1.2;
      color: #000;
    }
    .position {
      margin-top: 14px;
      display: flex;
      font-size: 16px;
      line-height: 1.5;
      color: #72777b;
      overflow: hidden;
      .addInfo {
        color: #4a68ad;
        cursor: pointer;
      }
    }
    .intro {
      margin-top: 4px;
      display: flex;
      font-size: 16px;
      color: #72777b;
      overflow: hidden;
      .addInfo {
        color: #4a68ad;
        cursor: pointer;
      }
    }
    .author-icon {
      color: #72777b;
      font-size: 17px;
      margin-right: 5px;
    }
  }
}
</style>