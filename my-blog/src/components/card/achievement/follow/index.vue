<template>
  <div class="follow">
    <div class="follow-item" @click="checkFollows(index)" v-for="(list, index) in follows" :key="index">
      <div class="item-title">{{list.title}}</div>
      <div class="item-count">{{list.count}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { getfollowList } from '../../../../api/follow'
import { IFollow } from '../../../../api/types'

@Component
export default class extends Vue {
  @Prop() private follows!: IFollow[]

  @Emit('checkFollows')
  private checkFollows(index: number) {
    const action = {
      radio: index,
      label: '3'
    }
    return action
  }
}
</script>

<style lang="scss" scoped>
.follow {
  position: fixed;
  width: 240px;
  top: 300px;
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  .follow-item {
    box-sizing: border-box;
    flex: 1 1 auto;
    cursor: pointer;
    padding: 14px 0;
    text-align: center;
    color: #31445b;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 50%;
      background-color: #f3f3f4;
      transform: translate(-50%,-50%);
    }
    .item-title {
      font-size: 16px;
      font-weight: 600;
    }
    .item-count {
      font-size: 15px;
      margin-top: 8px;
      font-weight: 600;
    }
  }
}
</style>
