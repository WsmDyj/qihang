<template>
  <div class="oauth">
    <span class="oauth-login">正在登录...</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'
@Component
export default class extends Vue {
  async created() {
    const search = window.location.search.split('=')[1]
    const data = await UserModule.oauthLogin(search)
    alert(data)
    if (data) {
      // 关闭窗口并刷新原页面
      window.opener.location.reload()
      window.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.oauth {
  width: 100vh;
  height: 100vh;
  background-color: #f4f5f5;
  .oauth-login {
    font-size: 20px;
    color: #000;
    opacity: .8;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 50px;
  }
}
</style>
