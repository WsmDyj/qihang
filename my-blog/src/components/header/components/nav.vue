<template>
  <ul class="nav-content">
    <li class="nav-item fs-18" v-for="(nav, index) in navs" :key="index">
      <router-link active-class="active" :to="nav.path">{{ nav.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface Inav {
  id: number;
  name: string;
  path: string;
}

@Component
export default class extends Vue {
  private navs: Inav[] = [
    { id: 0, name: "首页", path: "/" },
    { id: 1, name: "等你来答", path: "/questions" },
    // { id: 2, name: '阅读', path: '/hot' },
    { id: 3, name: "发现", path: "/share" }
  ];
}
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
a {
  color: $navcolor;
  text-decoration: none;
  display: block;
  font-weight: 500;
}
.nav-content {
  @include flexcenter($jc: space-between);
  width: 14.285714rem /* 200/14 */;
  .nav-item {
    .router-link-exact-active {
      color: $primary;
    }
  }
}
</style>
