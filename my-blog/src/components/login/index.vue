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
              <el-input v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="input-box" prop="password">
              <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button class="btn" @click.native.prevent="handleLogin" type="primary">{{activeIndex == '1' ? '登录':'注册'}}</el-button>
        <div class="prompt-box">
          没有账号？ 
          <span class="clickable">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  private activeIndex: string = '1'
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

  // private visible: boolean = true
  get islogin() {
    return UserModule.islogin
  }
  // 登录/注册切换
  private handleSelect(key: string) {
    this.activeIndex = key === '2' ? '2' : '1'
  }
  private closeLogin() {
    UserModule.handleIslogin(false)
  }
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate( async (valid: boolean) => {
      if (valid) {
        if (this.activeIndex == '1') {
          const data = await UserModule.Login(this.loginForm)
          await UserModule.GetUserInfo()
        } else {
          const data = await UserModule.Register(this.registerForm)
          await UserModule.GetUserInfo()
        }
      } else {
        return false
      }
    })
  }
  private focus() {
    console.log('hello')
    this.imageURL = 'https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png'
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
      float: right;
      cursor: pointer;
      opacity: .4;
    }
    .panel {
      .panel-title {
        font-size: 21px;
        margin: 0 0 2rem;
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
      .prompt-box {
        color: #8b9196;
        font-size: 14px;
        .clickable {
          color: #007fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>