<template>
  <transition name="el-fade-in">
  <div class="login" v-if='islogin'>
    <div class="auth-form">
      <i title="关闭" @click="closeLogin" class="close-btn iconfont">&#xe710;</i>
      <div class="panel">
        <formBox :type = activeIndex @onSubmit="handleLogin" />
        <div class="oauth-box">
          <div class="oauth-title">第三方账号登录：</div>
          <div class="oauth-content">
            <div class="oauth-bg" @click="hadnleOauth">
              <svg width="32.8" height="32.8" viewBox="0 0 21 18" class="icon github-icon"><path data-v-335a593e="" fill="#161614" fill-rule="nonzero" d="M1.857 9.203c0 3.624 2.456 6.698 5.862 7.782.429.076.585-.177.585-.395 0-.194-.007-.71-.012-1.395-2.384.496-2.887-1.1-2.887-1.1-.39-.947-.952-1.2-.952-1.2-.778-.508.06-.498.06-.498.86.058 1.312.846 1.312.846.765 1.253 2.007.89 2.495.68.078-.529.3-.89.544-1.095-1.903-.207-3.904-.911-3.904-4.054 0-.896.334-1.628.882-2.201-.088-.208-.383-1.042.084-2.171 0 0 .72-.22 2.357.84a8.557 8.557 0 0 1 2.146-.276 8.566 8.566 0 0 1 2.146.277c1.636-1.062 2.354-.841 2.354-.841.468 1.129.174 1.963.086 2.17.55.574.881 1.306.881 2.202 0 3.15-2.004 3.844-3.913 4.047.307.253.581.754.581 1.52 0 1.096-.01 1.98-.01 2.25 0 .219.154.474.589.394C16.546 15.898 19 12.825 19 9.203 19 4.673 15.162 1 10.428 1c-4.733 0-8.57 3.672-8.57 8.203z"></path></svg>
            </div>
          </div>
        </div>
        <div class="agreement-box">
          注册登录即表示同意
          <span class="agreement">用户协议</span>、
          <span class="agreement">隐私政策 </span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { UserModule, IRegister } from '../../store/modules/user'
import formBox from './components/formBox.vue'

@Component({
  name: 'login',
  components: {
    formBox
  }
})

export default class extends Vue {
  
  stopMove (){
    var mo=function(e: any){e.preventDefault();};
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",mo,false);//禁止页面滑动
  }

  removeStop() {
    var mo=function(e: any){e.preventDefault();};
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",mo,false);
  }

  
  // github登录
  private async hadnleOauth() {
    window.open("/oauth", "", "height=600, width=700")
    UserModule.handleIslogin(false)
  }

  get islogin() {
    UserModule.islogin ? this.stopMove() : this.removeStop()
    return UserModule.islogin
  }

  get activeIndex() {
    return UserModule.loggedType
  }
  
  // 关闭弹窗按钮
  private closeLogin() {
    UserModule.handleIslogin(false)
  }

  // 注册和登录
  private async handleLogin(event: IRegister) {
    if (this.activeIndex == 'login') {
      const data = await UserModule.Login({username: event.username, password: event.password})
      await UserModule.GetUserInfo()
    } else {
      const data = await UserModule.Register(event)
      if (data.errno != -1) {
        this.$notify({
          title: '注册成功',
          message: '欢迎来到起点',
          type: 'success'
        })
        await UserModule.GetUserInfo()
      }
    }
    await window.location.reload(false)
  }
}
</script>

<style lang="scss" scoped>
.login {
  @include flexcenter();
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 999;
  .auth-form {
    position: relative;
    padding:0 24px 20px 24px;
    width: 318px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    .close-btn {
      position: absolute;
      z-index: 999;
      right: 20px;
      top: 24px;
      cursor: pointer;
      opacity: .5;
      &:hover {
        color: #000;
        opacity: 1;
      }
    }
    .panel {
      .oauth-box {
        color: $fontcolor;
        font-size: 14px;
        .oauth-content {
          @include flexcenter($jc: space-around);
          margin-top: 15px;
          .oauth-bg {
            @include flexcenter();
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #f4f8fb;
            cursor: pointer;
          }
        }
      }
      .agreement-box {
        color: $fontcolor;
        font-size: 14px;
        margin-top: 15px;
        .agreement {
          color: $primary;
          cursor: pointer;
        }
      }
    }
  }
}
</style>