<template>
  <ul class="navbar-menu">
    <li class="navbar-menu__content fs-18" v-for="(item, index) in menu" :key="index">
      <router-link active-class="active" :to="item.path">{{ item.name }}</router-link>
    </li>
  </ul>
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

.navbar-menu {
  @include flexcenter($jc: space-between);

  &__content {
    padding-right: 2.142857rem /* 30/14 */;
  }
}
</style>
