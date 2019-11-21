<template>
  <div class="register" v-if='isResign'>
    <div class="auth-form">
      <i title="关闭" @click="closeResign" class="close-btn iconfont">&#xe710;</i>
      <div class="panel">
        <h1 class="title">注册</h1>
        <el-form :rules="loginRules" ref="loginForm" :model="registerForm" class="login-form">
          <el-form-item class="input-box" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="input-box" prop="password">
            <el-input v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" @click.native.prevent="handleLogin" type="primary">注册</el-button>
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
  private isResign: boolean = false
  private registerForm = {
    username: '',
    password: ''
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur'}],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
}
</script>

<style lang="scss" scoped>
.register {
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
    max-width: 100%;
    font-size: 24px;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    .close-btn {
      float: right;
      cursor: pointer;
      opacity: .4;
    }
    .panel {
      .title {
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