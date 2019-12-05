<template>
  <div class='header'>
    <div class="container">
      <div class="logo">
      </div>
      <div class="navigation">
        <div class="nav-list">
          <div class="menu" v-for="(action, index) in actions" :key="index">
            <router-link class="menu-item" tag="div" :to='{path: action.path}'>{{ action.name }}</router-link>
          </div>
        </div>
        <div class="nav-list">
          <el-input size="small" v-model="keyword" placeholder="请输入内容">
          </el-input>
          <router-link target="_blank" :to="{path: '/search', query:{keyword: keyword}}" class="search-icon">
            <i class="el-icon-search"></i>
          </router-link>
        </div>
        <div class="nav-list" v-if="visivle">
          <div class="nav-item">
            <router-link to = '/markdown'>
              <el-button size="mini" type="primary">写文章</el-button>
            </router-link>
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
          <div class="nav-item submit" @click="login">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg" class="icon">
            <span>写文章</span>
          </div>
          <div class="nav-item auth">
            <span @click="login('1')" class="login">登录</span>
            <span @click="login('2')" class="register">注册</span>
          </div>
        </div>
      </div>
    </div>
    <login :activeIndex = activeIndex />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Login from '../login/index.vue'
import { UserModule } from '../../store/modules/user'
import Dropdown from '@/components/menu/dropdown/index.vue'
import { getArticles } from '../../api/blog'
interface Iactions {
  id: number
  name: string
  path: string
}

@Component({
  components: {
    Login,
    Dropdown,
  },
})

export default class extends Vue {
  private keyword: string = ''
  private curAction: number = 0
  private activeIndex: string = '1'
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
  private handleAction(action: Iactions): void {
  }
  
  private login(action: string) {
    this.activeIndex = action
    UserModule.handleIslogin(true)
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 99;
  border-bottom: 1px solid #f1f1f1;
  // box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  .container {
    height: 100%;
    max-width: 960px;
    margin: auto auto;
    display: flex;
    align-items: center;
    .logo {
      width: 98px;
      height: 60%;
      background-image: url('../../assets/qd1.jpg');
      background-size: 100% 100%;
      margin-right: 28px;
      transform: scale(1.7);
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
        position: relative;
        font-size: 16px;
        cursor: pointer;
        .search-icon {
          position: absolute;
          right: 10px;
          color: #666;
        }
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
