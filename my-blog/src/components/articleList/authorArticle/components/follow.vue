<template>
  <div class="container">
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
      <div class="follow" v-for="(item, index) in lists" :key="index">
        <author-info :userInfo='item'>
          <div slot="content" class="detail">{{ item.job }} @{{ item.company }}</div>
        </author-info>
        <div class="follow-action">
          <followAction size='small' :author = item.author />
        </div>
      </div>
    </div>
    <div v-else>
      <emptyBox />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import followAction from '../../../follow/index.vue'
import { IFollow } from '../../../../api/types'
import authorInfo from '../../../authorInfo/index.vue'
import emptyBox from './emptyBox.vue'

@Component({
  components: { 
    followAction,
    emptyBox,
    authorInfo
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
      &:after {
        content: "";
        position: absolute;
        width: 1px;
        margin-top: -5px;
        top: 50%;
        right: 0px;
        height: 12px;
        background-color: #b2bac2;
        opacity: .8;
      }
    }
  }
}
.follow {
  @include flexcenter($jc:space-between);
  padding: 20px 30px;
  border-bottom: 1px solid $border-bottom;
  .detail {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
