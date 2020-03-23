<template>
  <div class="form">
    <div class="panfish" v-if="type === 'login'">
      <img style="width: 120px; height: 95px;" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
      <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="normal" alt=""> -->
      <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="normal" alt=""> -->
    </div>
    <div class="form-title">{{ type == 'login' ? '登录' : '注册' }}</div>
    <el-form :rules="rules" autocomplete="on" ref="Form" :model="formData" class="form-content">
      <el-form-item v-if="type === 'register'" prop="nickname">
        <el-input type="text" :autocomplete="type === 'login' ? 'on' : 'new-password'" v-model="formData.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text" v-model="formData.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item v-if="type === 'register' && showCode === true" prop="code">
        <el-input type="text" v-model="formData.code" placeholder="手机验证码">
          <template slot="append">
            <div @click="getCode" v-if="visible">获取验证码</div>
            <div class="reset" v-else>
              <span class="reset-time">{{ time }}</span> s后重发</div>
            </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" :autocomplete="type === 'login' ? 'on' : 'new-password'" placeholder="请输入密码(不少于3位)" v-model="formData.password" @keyup.enter.native="handleLogin" show-password></el-input>
      </el-form-item>
      <el-button class="sumbit-btn" @click.native.prevent="handleLogin" :loading="show" :type="show ? 'info' : 'primary'">{{ type === 'login' ? '登录' : '立即注册' }}</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import { sendSmsCodeToUser } from '../../../api/user'

@Component
export default class extends Vue {
  @Prop() private type!: string
  
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error('请输入手机号'))
    } else {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      reg.test(this.formData.username) ? callback() : callback(new Error('请输入正确的手机号码'))
    }
  }
  get showCode() {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/
    return reg.test(this.formData.username) ? true : false
  }
  private visible:boolean = true
  private show:boolean = false // 点击登录后
  private time: number = 30
  private formData = { username: '', password: '', nickname: '', code: '' }
  private rules = {
    nickname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    username: [{ validator: this.validateUsername, trigger: 'blur'}],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, message: '密码不少于3位数', trigger: 'blur' }]
  }
  private handleLogin() {
    (this.$refs.Form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.show = true
        this.$emit('onSubmit', this.formData)
      } else {
        return false
      }
    })
  }
  // 离开页面/刷新页面 重新运行计时器
  private monitor() {

  }

  private async getCode() {
    await sendSmsCodeToUser({username: this.formData.username})
    this.visible = false
    let timer = setInterval(() => {
      if (this.time > 1) { 
        this.time = this.time - 1
      } else {
        this.time = 30
        this.visible = true
        clearInterval(timer) 
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.panfish {
  position: absolute;
  top: 0;
  left: 50%;
  width: 140px;
  transform: translate(-50%,-83%);
  z-index: 9;
}
.form-title {
  font-size: 20px;
  margin: 24px 0;
  font-weight: 600;
}
.sumbit-btn {
  width: 100%;
  height: 40px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 18px;
}
.item-code {
  display: flex
}

</style>
