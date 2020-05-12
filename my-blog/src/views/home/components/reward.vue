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
              <div class="reward-desc">让世界感知你的存在</div>
              <el-image fit="cover" style="width: 130px; height:130px" :src="require('@/assets/advert/WechatReward.jpeg')"></el-image>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="reward-right">
              <div class="reward-title">
                已有10人赞赏
                <el-tooltip class="item" effect="dark" content="感谢以下用户的支持" placement="top">
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

@Component
export default class extends Vue {
  private dialogVisible: boolean = false
  private rewardLists: any[] = [
    {nickname: '南墙的数', cash: 20, date: '2020-05-01'},
    {nickname: '等风来', cash: 20, date: '2020-04-30'},
    {nickname: '好的#', cash: 20, date: '2020-04-23'},
    {nickname: 'FARIS', cash: 10, date: '2020-04-02'},
    {nickname: '等风来', cash: 10, date: '2020-03-09'},
    {nickname: 'Wesley', cash: 10, date: '2020-02-02'},
    {nickname: '行', cash: 5, date: '2020-01-28'},
    {nickname: '大河——besos', cash: 5, date: '2020-01-22'}
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
            border-bottom: 1px solid $border-color;
            &:last-child {
              border-bottom: none;
            }
            .item-text {
              font-size: 1.1rem;
              padding: 6px 4px;
              box-sizing: border-box;
              flex: 1;
              &:first-child {
                padding-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
