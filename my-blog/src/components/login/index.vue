<template>
  <div class="login" v-if='islogin'>
    <div class="auth-form">
      <div class="panfish">
        <img :src= imageURL class="normal" style="">
        <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="normal" alt=""> -->
        <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="normal" alt=""> -->
      </div>
      <i title="关闭" @click="closeLogin" class="close-btn iconfont">&#xe710;</i>
     
      <div class="panel">
        <div class="panel-title">
          <el-menu :default-active="activeIndex" class="sub-header" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">登录</el-menu-item>
            <el-menu-item index="2">注册</el-menu-item>
          </el-menu>
        </div>
        <div v-if="activeIndex == '1'">
          <el-form :rules="loginRules" ref="loginForm" :model="loginForm" class="login-form">
            <el-form-item class="input-box" prop="username">
              <el-input type="text" autocomplete="off" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="input-box" prop="password">
              <el-input type="password" autocomplete="off" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="handleLogin" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <el-form :rules="loginRules" ref="loginForm" :model="registerForm" class="login-form">
            <el-form-item class="input-box" prop="username">
              <el-input clearable v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="input-box" prop="password">
              <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button class="btn" @click.native.prevent="handleLogin" type="primary">{{activeIndex == '1' ? '登录':'注册'}}</el-button>
        <div class="oauth-box">
          <div class="oauth-title">第三方账号登录：</div>
          <div class="oauth">
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
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { UserModule } from '../../store/modules/user'
import { Form as ElForm, Input } from 'element-ui'

@Component({
  name: 'login'
})

export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error('Please enter the correct passworld'))
    } else {
      callback()
    }
  }
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

  @Prop({ default: '1' }) private activeIndex!: string
  private loginForm = {
    username: '',
    password: ''
  }
  private registerForm = {
    username: '',
    password: ''
  }
  private imageURL: string = 'https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png'
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur'}],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
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
  // 登录/注册切换
  private handleSelect(key: string) {
    this.activeIndex = key === '2' ? '2' : '1'
  }
  // 关闭弹窗按钮
  private closeLogin() {
    UserModule.handleIslogin(false)
  }
  // 注册和登录
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate( async (valid: boolean) => {
      if (valid) {
        if (this.activeIndex == '1') {
          const data = await UserModule.Login(this.loginForm)
          await UserModule.GetUserInfo()
        } else {
          const data = await UserModule.Register(this.registerForm)
          if (data.errno != -1) {
            this.$notify({
              title: '注册成功',
              message: '欢迎来到起点',
              type: 'success'
            })
            await UserModule.GetUserInfo()
          }
        }
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 900;
  .auth-form {
    position: relative;
    padding: 24px;
    width: 318px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    .panfish {
      position: absolute;
      top: 0;
      left: 50%;
      width: 140px;
      transform: translate(-50%,-83%);
      z-index: 1;
      .normal {
        width: 120px;
        height: 95px;
      }
    }
    .close-btn {
      position: absolute;
      z-index: 999;
      right: 20px;
      cursor: pointer;
      opacity: .5;
      &:hover {
        color: #000;
        opacity: 1;
      }
    }
    .panel {
      .panel-title {
        font-size: 21px;
        margin: 0 0 24px;
      }
      .login-form {
        margin-bottom: 7px;
        .input-box {
          margin-bottom: 20px;
        }
      }
      .btn {
        width: 100%;
        height: 46px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 18px;
      }
      .oauth-box {
        color: #767676;
        font-size: 14px;
        .oauth {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: 15px;
          .oauth-bg {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #f4f8fb;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
      .agreement-box {
        color: #767676;
        font-size: 14px;
        margin-top: 15px;
        .agreement {
          color: #007fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>