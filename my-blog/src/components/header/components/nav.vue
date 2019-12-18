<template>
  <ul class="nav-content">
    <li class="nav-item" v-for="(nav, index) in navs" :key="index">
      <router-link
        active-class="active"
        :to="nav.path">{{ nav.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Iactions {
  id: number
  name: string
  path: string
}
@Component
export default class extends Vue {
  private navs: Iactions[] = [
    { id: 0, name: '文章', path: '/' },
    { id: 1, name: '问答', path: '/questions' },
    { id: 2, name: '视频', path: '/hot' },
    { id: 3, name: '分享', path: '/share'}]
}
</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
}
a {
  color: $navcolor;
  text-decoration: none;
  display: block;
  font-size: 16px;
  font-weight: 500;
  padding-right: 30px;
}
.nav-content {
  @include flexcenter($jc:flex-end);
  .nav-item {
    .router-link-exact-active {
      color: $primary;
    }
  }
}

</style>
