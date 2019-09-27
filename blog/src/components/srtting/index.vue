<template>
  <div class="setting">
    <div class="setting-profile">
      <h1>个人资料</h1>
      <div class="setting-list">
        <div v-for="(list, index) in settings" :key="index">
          <div class="item" v-if="list.title === '头像'">
            <div class="title">{{ list.title }}</div>
            <div class="box">
              <el-avatar fit="cover" :size="72" shape="square" :src="list.info"></el-avatar>
              <div class="box-button">
                <div class="box-toolitp">支持jpg、png格式大小</div>
                <el-button size="mini" type="primary">点击上传</el-button>
              </div>
            </div>
          </div>
          <div class="item" v-else>
            <div class="title">{{ list.title }}</div>
            <div class="action-box" @click="changeInfo(list)">
              <div class="center">
                <el-input v-model="list.info"></el-input>
              </div>
              <div v-if="list.id === curIndex" class="agree action-button">
                <span class="confirm" @click.stop="confirm(list)">保存</span>
                <span class="cancel" @click.stop="cancel(list)">取消</span>
              </div>
              <div v-else class="edit action-button">
                <i class="el-icon-edit"></i>
                <span>修改</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      curIndex: 8,
      
    }
  },
  methods: {
    changeInfo(list) {
      this.curIndex = list.id
    },
    // 资料修改保存  事件冒泡添加事件修饰符
    confirm(list) {
      this.$message({ message: '保存成功', type: 'success'});
      this.curIndex = 8
    },
    cancel() {
      this.curIndex = 8
    }
  },
  computed: {
    settings() {
      let list = [
        { id: 0, title: '头像', info: 'avatar' },
        { id: 1, title: '用户名', info: 'nickname' },
        { id: 2, title: '职位', info: 'job' },
        { id: 3, title: '公司', info: 'company' },
        { id: 4, title: '个人介绍', info: 'autograph' }
      ]
      let state = this.$store.state.userInfo
      list.forEach(item => {
        const key = Object.keys(state).filter(key => key === item.info)
        item.info = state[key]
      })
      return list
    }
  },
}
</script>
<style lang="scss" scoped>
.setting {
  width: 620px;
  height: 650px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 2px;
  font-size: 16px;
  padding: 32px 48px 48px;
  h1 {
    color: #333;
    margin: 16px 0;
  }
  .setting-list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
      border-top: 1px solid #f1f1f1;
      &:first-child {
        padding: 12px 0;
      }
      .title {
        color: #333;
        width: 120px;
      }
      .action-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .center {
          color: #909090;
          flex-wrap: 600;
          flex: 1;
        }
        .action-button {
          cursor: pointer;
          color: #007fff;
          font-size: 14px;
          .confirm {
            font-weight: 600;
          }
          .cancel {
            color: #666;
            margin-left: 5px;
          }
        }
      }
      .box {
        flex: 1;
        display: flex;
        .box-button {
          margin-left: 30px;
          .box-toolitp {
            margin-bottom: 18px;
            font-size: 12%;
            color: #909090;
            font-weight: 600;
          }
        }
      }
    }
    &:last-child {
      border-bottom: 1px solid #f1f1f1;
    }
  }
}
</style>