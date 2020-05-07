<template>
  <div class="setting">
    <div class="setting-profile">
      <h1>个人资料</h1>
      <div class="setting-list">
        <setting-item title="avatar">
          <div slot="avatar" class="box">
            <el-avatar fit="cover" :size="62" shape="square" :src="imgUrl"></el-avatar>
            <div class="box-button">
              <div class="box-toolitp">支持jpg、png格式，大小且不超过2M</div>
              <upload-avatar @upload='handleUpload'></upload-avatar>
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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule }  from '../../../store/modules/user'
import settingItem from './item/index.vue'
import uploadAvatar from './uploadAvatar/index.vue'
import { updateUserInfo } from '../../../api/user'
import { IUserInfo } from '../../../api/types'

const defaultIUserInfo = {
  avatar: '',
  autograph: '',
  company: '',
  job: '',
  nickname: '',
}
@Component({
  components: {
    settingItem,
    uploadAvatar
  },
})


export default class extends Vue {
  private filters: IUserInfo = defaultIUserInfo
  private imgUrl: string = ''
  get nickname() {
    return UserModule.nickname
  }
  get autograph() {
    return UserModule.autograph
  }
  get avatar() {
    return UserModule.avatar
  }
  get job() {
    return UserModule.job
  }
  get company() {
    return UserModule.company
  }
  async created() {
    this.getUser()
  }
  private getUser() {
    this.imgUrl = this.avatar
    this.filters = {
      autograph: this.autograph,
      company: this.company,
      job: this.job,
      avatar: this.avatar,
      nickname: this.nickname
    }
  }
  private async handleUpload(event: string) {
    this.imgUrl = event
    this.filters.avatar = event
    await updateUserInfo(this.filters)
    await UserModule.GetUserInfo()
    this.$message({ message: '头像上传成功', type: 'success' })
  }
  async confirm(event: any) {
    let updateInfo: IUserInfo = Object.assign(this.filters, event)
    await updateUserInfo(updateInfo)
  }
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