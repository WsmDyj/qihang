<template>
  <div id="home">
    <div>{{msg}}</div>
    {{user}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule }  from '../store/modules/user'
import { getToken, setToken, removeToken } from '../utils/cookies'
export interface IProfile {
  autograph: string
  avatar: string
  company: string
  job: string
  nickname: string
}

const defaultProfile: IProfile = {
  autograph: 'Loading...',
  avatar: 'Loading...',
  company: 'Loading...',
  job: 'Loading...',
  nickname: 'Loading...'
}

@Component({
  components: {
  },
})

export default class App extends Vue {
  msg: string = 'this is home page'
  private user = defaultProfile
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
    // await UserModule.ResetToken()
    // await UserModule.Login({username: 'zhangsan', password: '123'})
    await UserModule.GetUserInfo()

    this.getUser()
  }
  private getUser() {
    this.user = {
      autograph: this.autograph,
      avatar: this.avatar,
      company: this.company,
      job: this.job,
      nickname: this.nickname
    }
  }
}
</script>

<style>
</style>
