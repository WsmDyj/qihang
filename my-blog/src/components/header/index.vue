<template>
  <div class="navbar qh-hairline--bottom" :class="{visible: visible}">
    <div class="navbar-container">
      
      <div class="qh-logo">
        <!-- <router-link to='/'>
        <el-image fit='fill' class="qh-logo" :src="require('../../assets/login/qihang.jpg')" />
      </router-link> -->
      </div>
      
      <div class="navbar-content">
        <div>
          <Nav />
        </div>
        <div class="navbar-wrapper">
          <div class="navbar-wrapper__search">
            <el-input
              size="small"
              @focus="inputIcon = true"
              @blur="inputIcon = false"
              v-model="keyword"
              placeholder="搜索起航"
            />
            <router-link
              :style="{ color: inputIcon ? '#007fff' : '#DCDFE6' }"
              :to="{ path: '/search', query: { keyword: keyword } }"
              class="search-icon fs-14"
            >
              <i class="el-icon-search" />
            </router-link>
          </div>

          <div class="navbar-wrapper__action" v-if="visivle">
            <div class="screen-button">
              <router-link to="/markdown">
                <div class="header-button">写文章</div>
              </router-link>
            </div>
            <div class="notice">
              <el-badge type="primary">
                <i class="iconfont notice-icon">&#xe61e;</i>
              </el-badge>
            </div>
            <el-popover trigger="hover" width="150">
              <Dropdown />
              <el-avatar slot="reference" size="medium" :src="avatar"/>
            </el-popover>
          </div>
          <div class="navbar-wrapper__action" v-else>
            <div class="navbar-wrapper__action--item header-button" @click="submit('login')">
              <i class="el-icon-edit" />写文章
            </div>
            <div class="navbar-wrapper__action--item">
              <span @click="submit('login')" class="login btn">登录</span>
              <span @click="submit('register')" class="register btn">注册</span>
            </div>
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
import Nav from "./components/nav.vue"

interface Iactions {
  id: number;
  name: string;
  path: string;
}

@Component({
  components: {
    Dropdown,
    Nav
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
  transition: all 0.2s;
  box-sizing: border-box;
  transform: translate3d(0, -100%, 0);
  z-index: 9;
  width: 100%;
  height: 60px;
  background: #fff;

  &-container {
    @include flexcenter($jc: space-between);
    margin: auto auto;
    height: 100%;
    width:  71rem /* 994/14 */;
    @media only screen and (max-width: 1024px) { 
      box-sizing: border-box;
      width: 100%;
      padding: 0 10px;
    }
  }
  &-content {
    @include flexcenter($jc: space-between);
    flex: 1;
  }

  &-wrapper {
    @include flexcenter($jc: flex-end);
    &__search {
      position: relative;
      display: inline-block;
      width: 180px;
      .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
      @media only screen and (max-width: 768px) { 
        width: 120px;
      }
    }

    &__action {
      @include flexcenter($jc: flex-end);
      cursor: pointer;
      color: $primary;
      &--item {
        position: relative;
        display: inline-block;
        width: 100px;
        text-align: end;
        .el-icon-edit {
          padding-right: 4px;
        }
        .register {
          @include textRound($primary);
        }
      }
      .notice {
        padding: 0 2.142857rem /* 30/14 */;
        &-icon {
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
.btn {
  font-size: 16px;
}
.header-button {
  width: 80px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: bold;
  background-color: $primary;
  margin-left: 2.142857rem /* 30/14 */;
  @media only screen and (max-width: 750px) { 
    display: none
  }
}

.visible {
  transform: translateZ(0);
}
.qh-logo {
  width: 98px;
  height: 42px;
  margin-right: 2.142857rem /* 30/14 */;
  background-image: url('../../assets/login/qihang.jpg');
  background-size: 100% 100%;
  @media only screen and (max-width: 750px) { 
    width: 45px;
    height: 42px;
    background-image: url('../../assets/login/logo.png');
  }
}
</style>
