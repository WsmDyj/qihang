<template>
  <div class="information">
    <div v-for="(item, index) in lists" :key="index">
      <router-link :to="item.path">
        <el-image fit="cover" class="information-image" :src="require(`@/assets/home/${item.name}.webp`)" />
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
  &-image {
    display: inline-block;
    border-radius: 3px;
    margin-bottom: 20px;
    cursor: pointer;
    width: 240px;
    height: 85px;
  }
}
</style>
