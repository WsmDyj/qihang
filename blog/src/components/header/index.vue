<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" class="logo-img" alt="掘金">
      </div>
      <div class="navigation">
        <div class="nav-list">
          <div class="menu" v-for="(action, index) in actions" :key="index">
            <div class="menu-item" @click="handleAction(action)">{{ action.name }}</div>
          </div>
        </div>
        <div class="nav-list" v-if="islogin">
          <div class="nav-item">
            <el-button size="mini" type="primary">写文章</el-button>
          </div>
          <div class="nav-item notice">
            <el-badge :value="12" class="item" type="primary">
              <i class="iconfont notice-icon">&#xe61e;</i>
            </el-badge>
          </div>
          <div class="nav-item auth">
            <div @click="show = !show">
              <el-avatar size="medium" :src= userInfo.avatar></el-avatar>
            </div>
            <div>
              <Dropdown v-show="show" />
            </div>
          </div>
        </div>
        <div class="nav-list" v-else>
          <div class="nav-item submit">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg" class="icon">
            <span>写文章</span>
          </div>
          <div class="nav-item auth">
            <span @click="login" class="login">登录</span>
            <span class="register">注册</span>
          </div>
        </div>
      </div>
    </div>
    <Login :visible= visible @close='hanleClose'/>
  </div>
</template>

<script>
import Login from '../login'
import axios from 'axios';
import store from '../../store'
import Dropdown from '../menu/dropdown'
import Navigation from './navigation'
import { getToken } from '@/utils/auth' 
export default {
  components: {
    Login,
    Dropdown,
    Navigation
  },
  data() {
    return {
      show: false,
      visible: true,
      islogin: false,
      userInfo: {},
      actions: [
        { id: 0, name: '首页', path: '/' },
        { id: 1,  name: '沸点' },
        { id: 2, name: '话题' },
        { id: 3, name: '活动' },
      ],
      curAction: 0
    }
  },
  created() {
    axios.get('/api/user/getInfo').then(res => {
      this.userInfo = res.data.data
      store.dispatch('getInfo', res.data.data)
    })
    this.islogin = true
  },
  methods: {
    handleAction(action) {
      this.$router.push(action.path)
    },
    login() {
      this.visible = true
    },
    hanleClose(parameter) {
      if (parameter == 'success') {
        this.islogin = true
      }
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  // position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 99;
  border-bottom: 1px solid #f1f1f1;
  .container {
    height: 100%;
    max-width: 960px;
    margin: auto auto;
    display: flex;
    align-items: center;
    .logo {
      min-width: 98px;
      margin-right: 28px;
    }
    .navigation {
      flex: 1 0 auto;
      display: flex;
      justify-content: space-between;
      .nav-list {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #007fff;
        font-size: 16px;
         cursor: pointer;
        .nav-item {
          display: flex;
          align-items: center;
        }
        .menu-item {
          padding: 0 24px;
          color: #71777c;
          font-size: 17px;
          &:hover {
            color: #007fff;
          }
        }
        .submit {
          position: relative;
          padding: 0 10px;
          &::after {
            content: "|";
            position: absolute;
            left: 100%;
            color: hsla(0,0%,59.2%,.4);
          }
        }
        .auth {
          position: relative;
          padding: 0 10px;
          .login {
            &:after {
              content: "·";
              font-weight: 700;
              color: #007fff;
              margin: 0px 8px;
            }
          }
        }
        .notice {
          margin: 0 20px;
          .notice-icon {
            font-size: 24px;
            color: #71777c;
            &:hover {
              color: #007fff;
            }
          }
        }
      }
    }
  }
}
.el-button--primary {
  background-color: #007fff;
  font-size: 16px;
  border: none;
}
</style>