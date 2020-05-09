<template>
  <div class="container">
    <div class="follow" v-for="(item, index) in lists" :key="index">
      <author-info :userInfo='item'>
        <div slot="content" class="detail">{{ item.job }} @{{ item.company || '添加公司' }}</div>
      </author-info>
      <div class="follow-action">
        <followAction size='small' :author = item.nickname />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorInfo from '../authorInfo/index.vue'
import followAction from '../follow/index.vue'
import { IFollow } from '../../api/types'

@Component({
  components: {
    authorInfo,
    followAction
  }
})
export default class extends Vue {
  @Prop() private lists!: IFollow[]
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  padding: 0 24px;
  .follow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 6px 0;
    min-height: 6rem /* 84/14 */;
    color: #b9c0c8;
    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
