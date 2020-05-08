<template>
  <div>
    <ul class="navbar-menu">
      <li class="navbar-menu__content" v-for="(item, index) in menu" :key="index">
        <router-link active-class="active" :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
    <el-dropdown class="navbar-screen__menu">
      <span class="el-dropdown-link">
        首页<i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="navbar-menu__content" v-for="(item, index) in menu" :key="index">
          <router-link active-class="active" :to="item.path">{{ item.name }}</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NAV_LIST, Qlist } from '../../../global'

@Component
export default class extends Vue {
  private menu: Qlist[] = NAV_LIST;
}
</script>

<style lang="scss" scoped>
a {
  color: $navcolor;
  text-decoration: none;
  display: block;
  font-weight: 500;
}
.router-link-exact-active {
  color: $primary;
}
.navbar-screen__menu {
  color: $primary;
  font-size: 16px;
  font-weight: 500;
  display: none;
  @media only screen and (max-width: 750px) { 
    display: block;
  }
}

.navbar-menu {
  @include flexcenter($jc: space-between);
  &__content {
    font-size: 16px;
    padding-right: 2.142857rem /* 30/14 */;
  }
  @media only screen and (max-width: 750px) { 
    display: none;
  }
}
</style>
