<template>
  <div class="follow">
    <div class="nav">
      <div class="nav-title">关注</div>
      <div class="nav-details">
        <el-radio-group @change="changeFollowType" v-model="radio">
          <el-radio class="details" :label="0">关注了</el-radio>
          <el-radio class="details" :label="1">关注者</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-if="lists.length > 0">
      <author-list :lists = lists></author-list>
    </div>
    <div v-else>
      <emptyBox />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import authorList from '../../../authorList/index.vue'
import { IFollow } from '../../../../api/types'
import emptyBox from '../../../emptyBox/index.vue'

@Component({
  components: { 
    emptyBox,
    authorList
  }
})
export default class extends Vue {
  @Prop() private follows!: IFollow[]
  @Prop() private actions!: object
  private lists: IFollow[] = []
  private radio: number = 0
  
  @Watch('follows')
  private watchFollows(val: IFollow[]) {
    this.lists = val[this.radio].data
  }

  @Watch('actions') 
  private actionsChange(val: {radio: number, label: string}) {
    this.radio = val.radio
    this.changeFollowType()
  }

  private changeFollowType() {
    this.lists = this.follows[this.radio].data
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
