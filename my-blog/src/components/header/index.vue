<template>
  <div class="navbar qh-hairline--bottom" :class="{visible: visible}">
    <div class="navbar-container">
      <router-link to='/'>
        <el-image fit='fill' class="qh-logo" :src="require('../../assets/login/qihang.jpg')" />
      </router-link>
      
      <div class="navbar-content">
        <Nav />
        <div class="navbar-wrapper">
          <div class="navbar-wrapper__search">
            <el-input
              size="small"
              @focus="inputIcon = true"
              @blur="inputIcon = false"
              v-model="keyword"
              placeholder="搜索文章或用户"
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
            <div class="navbar-wrapper__action--item header-button">
              <router-link to="/markdown">
                <el-button size="mini" type="primary">写文章</el-button>
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
          <div class="navbar-wrapper__action fs-16" v-else>
            <div class="navbar-wrapper__action--item" @click="submit('login')">
              <i class="el-icon-edit" />写文章
            </div>
            <div class="navbar-wrapper__action--item">
              <span @click="submit('login')" class="login">登录</span>
              <span @click="submit('register')" class="register">注册</span>
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
    width: 70.857143rem /* 992/14 */;
  }

  &-wrapper {
    @include flexcenter($jc: flex-end);
    &__search {
      position: relative;
      display: inline-block;
      width: 12.857143rem /* 180/14 */;
      .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }

    &__action {
      @include flexcenter($jc: flex-end);
      color: $primary;
      &--item {
        position: relative;
        display: inline-block;
        width: 7.142857rem /* 100/14 */;
        text-align: end;
        .el-icon-edit {
          padding-right: 4px;
        }
        .register {
          @include textRound($primary);
        }
      }
      .notice {
        padding: 0 20px;
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

  &-content {
    @include flexcenter($jc: space-between);
    flex: 1;
  }
}

.visible {
  transform: translateZ(0);
}
.qh-logo {
  width: 98px;
  height: 42px;
}
</style>
