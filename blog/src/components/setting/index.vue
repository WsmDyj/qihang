<template>
  <div class="setting">
    <div class="setting-profile">
      <h1>个人资料</h1>
      
      <div class="setting-list">
          <setting-item title="avatar">
            <div slot="avatar" class="box">
              <el-avatar fit="cover" :size="72" shape="square" :src="filters.avatar"></el-avatar>
              <div class="box-button">
                <div class="box-toolitp">支持jpg、png格式大小</div>
                <upload-avatar @getAvatarUrl="uploadImg"></upload-avatar></upload-avatar>
              </div>
            </div>
          </setting-item>
          <setting-item @updateInfo="confirm" title="nickname" :info= filters.nickname></setting-item>
          <setting-item @updateInfo="confirm" title="job" :info= filters.job></setting-item>
          <setting-item @updateInfo="confirm" title="company" :info= filters.company></setting-item>
          <setting-item @updateInfo="confirm" title="autograph" :info= filters.autograph></setting-item>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import settingItem from './item'
import uploadAvatar from './uploadAvatar'
export default {
  components: {
    settingItem,
    uploadAvatar
  },
  data() {
    return {
      filters: {
        avatar: '', nickname: '', job: '', company: '', autograph: ''
      }
    }
  },
  methods: {
    // 资料修改保存  事件冒泡添加事件修饰符
    confirm(event) {
      let userData = Object.assign(this.filters, event)
      axios.post('/api/user/updateUser', userData).then(res => {
        if (res.data.errno === 0) {
          this.$message({ message: '保存成功', type: 'success'})
        } else {
          this.$message.error('更新资料失败')
        }
      })
    },
    uploadImg(event) {
      this.confirm(event)
    }
  },
  created() {
    this.filters = this.$store.state.userInfo
  },
}
</script>
<style lang="scss" scoped>
.setting {
  width: 620px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 2px;
  font-size: 16px;
  padding: 32px 48px 48px;
  h1 {
    color: #333;
    margin: 16px 0;
    font-size: 24px;
  }
  .setting-list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>