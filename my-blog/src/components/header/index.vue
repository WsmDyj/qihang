<template>
  <div :class="visible ? 'header': 'visible header'">
    <div class="navigation">
      <div class="logo"></div>
      <div class="content">
        <Nav />
        <div class="nav-list">
          <div class="search">
            <el-input size="small" @focus="inputIcon=true" @blur="inputIcon=false" v-model="keyword" placeholder="搜索文章或用户">
            </el-input>
            <router-link target="_blank" :style="{color: inputIcon? '#007fff':'#71777c'}"  :to="{path: '/search', query:{keyword: keyword}}" class="search-icon">
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
            <div class="nav-item submit" @click="submit('login')">
              <i class="el-icon-edit"></i>
              <span>写文章</span>
            </div>
            <div class="nav-item auth">
              <span @click="submit('login')" class="login">登录</span>
              <span @click="submit('register')" class="register">注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login :activeIndex = activeIndex />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import Login from '../login/index.vue'
import { UserModule } from '../../store/modules/user'
import Dropdown from '../dropdown/index.vue'
import { getArticles } from '../../api/blog'
import Nav from './components/nav.vue'

interface Iactions {
  id: number
  name: string
  path: string
}

@Component({
  components: {
    Login,
    Dropdown,
    Nav
  },
})

export default class extends Vue {
  @Prop({default: true}) private visible!: boolean
  private keyword: string | (string | null)[] = ''
  private inputIcon: boolean = false
  private curAction: number = 0
  private activeIndex: string = ''
  private currentMenu: number = 0
  private actions: Iactions[] = [
    { id: 0, name: '文章', path: '/' },
    { id: 1, name: '问答', path: '/questions' },
    { id: 2, name: '视频', path: '/hot' },
    { id: 3, name: '分享', path: '/'}]

  get avatar() {
    return UserModule.avatar
  }
  get token() {
    return UserModule.token
  }
  get visivle(): boolean {
    return this.token ?  true :  false
  }
 

  private selectMenu(action: Iactions) {
    this.currentMenu = action.id
    this.$router.push(action.path)
  }
  
  private submit(action: string) {
    this.activeIndex = action
    UserModule.handleIslogin(true)
  }

  private created() {
    this.keyword = this.$route.query.keyword || ''
  }
  
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all .2s;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 99;
  box-sizing: border-box;
  border-bottom: 1px solid $border-bottom;
  .navigation {
    @include flexcenter($jc:space-between);
    margin: auto auto;
    height: 100%;
    width: 992px;
    .logo {
      width: 98px;
      height: 42px;
      background-image: url('../../assets/qihang.jpg');
      background-size: 100% 100%;
    }
    .content {
      @include flexcenter($jc:space-between);
      flex: 1;
      font-size: 16px;
      cursor: pointer;
      .nav-list {
        @include flexcenter($jc:flex-end);
        color: $primary;
        .search {
          position: relative;
          margin-right: 30px;
          width: 150px;
          .search-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            font-size: 14px;
            color: $navcolor;
          }
        }
        .nav-item {
          @include flexcenter($jc: none);
        }
        .menu-item {
          padding: 0 20px;
          color: $navcolor;
          font-size: 16px;
          font-weight: 500;
          &:hover,&:focus,&:active {
            color: $primary;
          }
        }
        .submit {
          position: relative;
          padding: 0 5px;
          @include splitLine(-2px);
        }
        .auth {
          position: relative;
          padding: 0 10px;
          .register {
            @include textRound($primary);
          }
        }
        .notice {
          padding: 0 20px;
          .notice-icon {
            font-size: 24px;
            color: $navcolor;
            &:hover {
              color: $primary;
            }
          }
        }
      }
    }
  }
}
.visible {
  transform: translate3d(0,-100%,0);
}
</style>
