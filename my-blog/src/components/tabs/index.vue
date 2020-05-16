<template>
  <div class="tabs-container">
    <van-tabs 
      title-inactive-color='#71777c' 
      title-active-color = '#007fff'
      v-model="current"
      @change="handleClick"
      swipeable 
      :border="false"
      :ellipsis="false" 
      :line-width="0"
    >
      <van-tab
        class="tabs-item"
        :title-style="tabStyle"
        :title="tab.value"  
        v-for="(tab, index) in tabs" 
        :key="index"
      />
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { Qtag } from '../../global'

@Component
export default class extends Vue {
  @Prop() private tabs!: Qtag[]
  @Prop() private activeIndex!:string
  @Prop() private splitLine!: Boolean
  private current: number = 0
  private tabStyle: object = {
    padding: '0 2rem 0 0',
  }

  @Watch('activeIndex')
  private async watchAuthor(val: string) {
    this.current = Number(val)
  }

  @Emit('click')
  private handleClick(name: string, title: string) {
    let currentTab: Qtag = { label: name.toString(), value: title }
    return currentTab
  }
}
</script>

<style lang="scss" scoped>
.tabs-container {
  height: 100%;
  width: 100%;
  max-width: 994px;
  margin: 0 auto;
  // background: red;
  @media (max-width: 768px) {
    margin: 0 1rem;
  }
}
</style>
