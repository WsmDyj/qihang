<template>
  <div class='header'>
    <div class="container">
      <div class="logo">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" class="logo-img" alt="掘金">
      </div>
      <div class="navigation">
        <div class="nav-list">
          <div class="menu" v-for="(action, index) in actions" :key="index">
            <router-link class="menu-item" tag="div" :to='{path: action.path}'>{{ action.name }}</router-link>
          </div>
        </div>
        <div class="nav-list" v-if="visivle">
          <div class="nav-item">
            <el-button size="mini" type="primary">写文章</el-button>
          </div>
          <div class="nav-item notice">
            <el-badge :value="12" class="item" type="primary">
              <i class="iconfont notice-icon">&#xe61e;</i>
            </el-badge>
          </div>
          <el-popover trigger="click" width="150" class="nav-item auth">
            <Dropdown />
            <el-avatar slot="reference" size="medium" :src= avatar></el-avatar>
          </el-popover>
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
    <login  />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Login from '../login/index.vue'
import { UserModule } from '../../store/modules/user'
import Dropdown from '@/components/menu/dropdown/index.vue'
interface Iactions {
  id: number
  name: string
  path: string
}

@Component({
  components: {
    Login,
    Dropdown
  },
})

export default class extends Vue {
  // private visivle: boolean = false
  private curAction: number = 0
  private actions: Iactions[] = [
    { id: 0, name: '首页', path: '/' },
    { id: 1, name: '沸点', path: '/' },
    { id: 2, name: '话题', path: '/' },
    { id: 3, name: '活动' , path: '/'}]

  get avatar() {
    return UserModule.avatar
  }
  get token() {
    return UserModule.token
  }
  get visivle(): boolean {
    return this.token ?  true :  false
  }
  // @Provide() private isRouterAlive: boolean = true

  // private reload() {
  //   this.isRouterAlive = false
  //   this.$nextTick((): void =>  {
  //     this.isRouterAlive = true
  //   }) 
  // }
  private handleAction(action: Iactions): void {
    console.log(action)
  }
  private login() {
    UserModule.handleIslogin(true)
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
          &:hover,&:focus,&:active {
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
