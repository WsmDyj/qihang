<template>
  <div class="navbar" :class="{visible: visible}">
    <div class="navbar-container">
      <div class="logo">
        <el-image class="logo-pc" :src="require('../../assets/img/logo-pc.jpg')" fit="fill" />
        <el-image class="logo-mobile" :src="require('../../assets/img/logo-mobile.jpg')" fit="fill" />
      </div>
      
      <div class="navbar-content">
        <div class="navbar-list">
          <nav-list />
        </div>
        <div class="navbar-wrapper">
          <div class="navbar-wrapper__search navbar-item">
            <el-input size="small" @focus="inputIcon = true" @blur="inputIcon = false"  v-model="keyword" placeholder="搜索起航" />
            <router-link :style="{ color: inputIcon ? '#007fff' : '#DCDFE6' }" :to="{ path: '/search', query: { keyword: keyword } }" class="search-icon fs-16">
              <i class="el-icon-search" />
            </router-link>
          </div>

          <div class="navbar-wrapper" v-if="visivle">
            <router-link to="/markdown" class="navbar-item navbar-item__button">
              <span>写文章</span>
            </router-link>
            <div class="navbar-item">
              <el-badge type="primary">
                <i class="iconfont navbar-item__notice">&#xe61e;</i>
              </el-badge>
            </div>
            <el-popover trigger="hover" width="150">
              <Dropdown />
              <el-avatar slot="reference" size="medium" :src="avatar"/>
            </el-popover>
          </div>
          <div class="navbar-wrapper" v-else>
            <div class="navbar-item navbar-item__button" @click="submit('login')">
              <span>写文章</span>
            </div>
            <div @click="submit('login')" class="navbar-item__login">登录</div>
            <div @click="submit('register')" class="navbar-item__register">注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator"
import { UserModule } from "../../store/modules/user"
import Dropdown from "./components/dropdown.vue"
import navList from "./components/navList.vue"

interface Iactions {
  id: number;
  name: string;
  path: string;
}

@Component({
  components: {
    Dropdown,
    navList
  }
})
export default class extends Vue {
  @Prop({ default: true }) private visible!: boolean;
  private keyword: string | (string | null)[] = "";
  private inputIcon: boolean = false;

  get avatar() {
    return UserModule.avatar;
  }

  get visivle(): boolean {
    return UserModule.token ? true : false;
  }

  private submit(action: string) {
    UserModule.handleIslogin(true);
    UserModule.handleLoggedType(action);
  }

  private created() {
    this.keyword = this.$route.query.keyword || "";
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all .2s;
  transform: translate3d(0, -100%, 0);
}
.navbar {
  box-sizing: border-box;
  z-index: 9;
  width: 100%;
  height: 5rem;
  background: #fff;
  border-bottom: 1px solid $border-article-color;
  &-container {
    @include flexcenter($jc: space-between);
    margin: 0 auto;
    height: 100%;
    width: 100%;
    max-width: 994px;
    
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  &-content {
    @include flexcenter($jc: space-between);
    flex: 1;
  }

  &-wrapper {
    @include flexcenter($jc: flex-end);
    cursor: pointer;
    &__search {
      position: relative;
      display: inline-block;
      width: 15rem /* 180/12 */;
      box-sizing: border-box;
      .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
      @media only screen and (max-width: 768px) { 
        width: 10rem /* 120/12 */;
      }
    }
  }

  .navbar-item {
    margin-right: 2.4rem;
    @media only screen and (max-width: 767px) { 
      margin-right: 1.5rem;
    }
    &__button {
      width: 80px;
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      font-size: 1.167rem;
      font-weight: bold;
      background-color: $primary;
      @media only screen and (max-width: 750px) { 
        display: none
      }
    }
    &__notice {
      font-size: 2rem /* 24/12 */;
      color: $navcolor;
      &:hover {
        color: $primary;
      }
    }
    &__login {
      font-size: 1.33rem;
      color: $primary;
    }
    &__register {
      font-size: 1.33rem;
      color: $primary;
      @include textRound($color: $primary);
    }
  }
}
.visible {
  transition: all .2s;
  transform: translateZ(0);
}
</style>
