<template>
  <div class="login" v-if="visible">
    <div class="auth-form">
      <div class="panfish">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="normal" style="">
      </div>
      <i title="关闭" @click="closeLogin" class="close-btn iconfont">&#xe710;</i>
      <div class="panel">
        <h1 class="title">登录</h1>
        <el-form ref="form" :model="form" class="input-group">
          <div class="input-box">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </div>
          <div class="input-box">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </div>
        </el-form>
          <el-button class="btn" @click="login" type="primary">登录</el-button>
        <div class="prompt-box">
          没有账号？ 
          <span class="clickable">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    closeLogin() {
      this.$emit('close')
    },
    login() {
      axios.post('/api/user/login', this.form).then(res => {
        if (res.data.errno == 0) {
          this.$message({ message: '登录成功', type: 'success'})
          this.$emit('close', 'success')
        }
      })
    }
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
    max-width: 100%;
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
      .title {
        font-size: 21px;
        margin: 0 0 2rem;
      }
      .input-group {
        margin-bottom: 7px;
        .input-box {
          margin-bottom: 11px;
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