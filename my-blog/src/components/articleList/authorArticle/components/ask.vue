<template>
  <div class="follow">
    <div class="nav">
      <div class="nav-title">问题</div>
      <div class="nav-details">
        <el-radio-group @change="changeFollowType" v-model="radio">
          <el-radio class="details" :label="0">我的问题</el-radio>
          <el-radio class="details" :label="1">我的收藏</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-if="lists.length > 0">
      <!-- <author-list :lists = lists></author-list> -->
    </div>
    <div v-else>
      <emptyBox />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import emptyBox from '../../../emptyBox/index.vue'

@Component({
  components: { 
    emptyBox,
  }
})
export default class extends Vue {
  private radio: number = 0
  private lists: string[] =[]

  changeFollowType() {

  }
}
</script>

<style lang="scss" scoped>
.nav {
  @include flexcenter($jc:space-between);
  padding: 20px 30px;
  border-bottom: 1px solid $border-bottom;
  color: #72777B;
  .nav-title {
    font-size: 16px;
    font-weight: 600;
    color: #2e3135;
  }
  .details {
    position: relative;
    display: inline-block;;
    &:first-child {
      padding: 0 10px;
      @include splitLine()
    }
  }
}

</style>
