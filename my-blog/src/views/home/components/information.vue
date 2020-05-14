<template>
  <div class="information">
    <div class="information-content" v-for="(item, index) in lists" :key="index">
      <router-link :to="item.path">
        <el-image fit="contain" class="information-image" :src="require(`@/assets/img/${item.name}.png`)" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { INFORMATION_LIST, Qlist } from '../../../global'

@Component
export default class extends Vue {
  private lists: Qlist[] = INFORMATION_LIST
}
</script>

<style lang="scss" scoped>
.information {
  width: 100%;
  font-size: 1.16rem;
  border-radius: 2px;
  cursor: pointer;
  &-image {
    border-radius: 2px;
    display: inline-block;
    // box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
    margin-bottom: 1.3rem;
    width: 240px;
    height: 137px;
  }
}
</style>
