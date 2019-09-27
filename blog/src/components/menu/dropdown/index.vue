<template>
  <transition name="el-fade-in-linear">
    <div class="nav-menu">
      <div class="nav-menu-group">
        <div class="nav-menu-item" @click="jumpAuthor">
          <i class="el-icon-edit item-icon"></i>
          <span class="item-text">写文章</span>
        </div>
        <div class="nav-menu-item" @click="jumpAuthor">
          <i class="el-icon-s-goods item-icon"></i>
          <span class="item-text">草稿</span>
        </div>
      </div>
      <div class="nav-menu-group">
        <div class="nav-menu-item" @click="jumpAuthor">
          <span class="el-icon-user-solid"></span>
          <span class="item-text">我的主页</span>
        </div>
        <div class="nav-menu-item" @click="jumpAuthor">
           <i class="iconfont item-icon">&#xe60c;</i>
          <span class="item-text">我赞过的</span>
        </div>
        <div class="nav-menu-item" @click="jumpAuthor">
          <span class="el-icon-s-tools"></span>
          <span class="item-text">设置</span>
        </div>
      </div>
      <div class="nav-menu-group">
        <div class="nav-menu-item" @click="loginOut">
          <i class="iconfont item-icon">&#xe608;</i>
          <span class="item-text">登出</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    jumpAuthor() {
      this.$router.push('/author')
    },
    loginOut() {
      this.$confirm('确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出登录!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          });          
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: absolute;
  z-index: 999;
  width: 154px;
  left: 50%;
  top: 130%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border: 1px solid rgba(177,180,185,.45);
  color: #71777c;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 12px;
  box-sizing: border-box;
  .nav-menu-group{
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,0,0,.04);
    .nav-menu-item {
      padding: 6px 6px 6px 12px;
      .item-icon {
        color: #71777c;
      }
      .item-text {
        margin-left: 7px;
      }
    }
  }
}
</style>