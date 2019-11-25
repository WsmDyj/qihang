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
      <router-link target="_blank" :to="{path: '/author', query:{author: item.author}}" class="follow" v-for="(item, index) in lists" :key="index">
        <div class="userInfo">
          <el-avatar :size="55" :src='item.avatar'></el-avatar>
          <div class="info-box">
            <div class="name">{{ item.author }}</div>
            <div class="detail">{{ item.job }} @ {{ item.company }}</div>
          </div>
        </div>
        <div class="follow-action">
          <followAction size='small' :author = item.author />
        </div>
      </router-link>
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
import emptyBox from './emptyBox.vue'
interface Iarray {
  [key: number]: any
}
@Component({
  components: { 
    followAction,
    emptyBox
  }
})
export default class extends Vue {
  @Prop() private follows!: IFollow[]
  private lists: IFollow[] = []
  private radio: number = 0
  @Watch('follows')
  private watchFollows(val: IFollow[]) {
    this.lists = val[this.radio].data
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
  .userInfo {
    @include flexcenter;
    .info-box {
      margin-left: 40px;
      .name {
        font-size: 16px;
        font-weight: 600;
        color: #2e3135;
      }
      .detail {
        margin-top: 6px;
        font-size: 12px;
        font-weight: 500;
        color: #b9c0c8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
