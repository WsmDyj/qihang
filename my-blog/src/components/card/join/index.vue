<template>
  <transition name="el-fade-in-linear">
    <div class="join" @click="submit('register')" v-show="show">
      <el-image fit="cover" style="border-radius:4px;width: 240px" :src="require('@/assets/home/join.jpg')"></el-image>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '../../../store/modules/user'

@Component
export default class extends Vue {
  get show() {
    return UserModule.token ? false : true
  }
  private submit(action: string) {
    UserModule.handleIslogin(true)
  }
}
</script>

<style lang="scss" scoped>
.join {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
