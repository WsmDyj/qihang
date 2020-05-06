<template>
  <div class="reward">
    <div class="reward-img" @click="dialogVisible=true">
      <el-image fit="cover" style="border-radius:4px;width: 240px" :src="require('@/assets/advert/reward.png')"></el-image>
    </div>
    <div class="dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        width="640px"
        center>
        <el-row class="reward-content" :gutter="20">
          <el-col :span="9">
            <div class="reward-left">
              <div class="reward-title">赞赏</div>
              <div class="reward-desc">梦想从这里起航</div>
              <el-image fit="cover" style="width: 130px; height:130px" :src="require('@/assets/advert/WechatReward.jpeg')"></el-image>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="reward-right">
              <div class="reward-title">
                已有10人赞赏
                <el-tooltip class="item" effect="dark" content="每周周一更新" placement="top">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
              <div class="reward-list">
                <div class="inner-list">
                  <div class="reward-item" v-for="(list, index) in rewardLists" :key="index">
                    <span class="item-text">{{list.nickname}}</span>
                    <span class="item-text">¥ {{list.cash}}</span>
                    <span class="item-text">{{list.date}}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
})
export default class extends Vue {
  private dialogVisible: boolean = false
  private rewardLists: any[] = [
    {nickname: '李四1', cash: 2, date: '2017-7-9'},
    {nickname: '李四2', cash: 2, date: '2017-7-9'},
    {nickname: '李四3', cash: 2, date: '2017-7-9'},
    {nickname: '李四4', cash: 2, date: '2017-7-9'},
    {nickname: '李四5', cash: 2, date: '2017-7-9'},
    {nickname: '李四6', cash: 2, date: '2017-7-9'},
    {nickname: '李四7', cash: 2, date: '2017-7-9'},
    {nickname: '李四8', cash: 2, date: '2017-7-9'},
  ]
}
</script>

<style lang="scss" scoped>
.reward {
  margin-bottom: 20px;
  cursor: pointer;
  .reward-content {
    height: 240px;
    .reward-left {
      text-align: center;
      height: 220px;
      border-right: 1px solid #dcdcdd;
      .reward-title {
        font-size: 26px;
        font-weight: 700;
        color: #444;
      }
      .reward-desc {
        color: #606266;
        margin: 10px 0 20px 0;
      }
    }
    .reward-right {
      font-size: 14px;
      .reward-title {
        font-weight: 700;
        color: #444;
      }
      .reward-list {
        height: 190px;
        overflow: hidden;
        margin-top: 10px;
        position: relative;
        .inner-list {
          position: absolute;
          left: 0;
          top: 0;
          right: -16px;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          .reward-item {
            display: flex;
            margin-bottom: 5px;
            justify-content: space-between;
            padding-right: 60px;
            border-bottom: 1px solid $border-color;
            &:last-child {
              border-bottom: none;
            }
            .item-text {
              color: #222;
              padding: 6px 4px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>
