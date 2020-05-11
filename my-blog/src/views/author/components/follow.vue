<template>
  <div class="entry">
    <div class="entry-nav">
      <div class="entry-nav__title">关注</div>
      <tabs :tabs = tabs @click="selectNav" />
    </div>
    <van-list>
      <div class="entry-content">
        <author-list :lists = lists></author-list>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import authorList from '@/components/authorList/index.vue'
import { IFollow } from '../../../api/types'
import emptyBox from '@/components/emptyBox/index.vue'
import tabs from '../../../components/tabs/index.vue'
import { Qtag } from '../../../global'
@Component({
  components: { 
    emptyBox,
    authorList,
    tabs
  }
})
export default class extends Vue {
  @Prop() private follows!: IFollow[]
  @Prop() private actions!: object
  private lists: IFollow[] = []
  private radio: number = 0
  private tabs: Qtag[] = [
    { value: '关注了', label: '0'},
    { value: '关注者', label: '1'},
  ]
  
  @Watch('follows')
  private watchFollows(val: IFollow[]) {
    this.lists = val[this.radio].data
  }

  @Watch('actions') 
  private actionsChange(val: {radio: number, label: string}) {
    this.radio = val.radio
    this.lists = this.follows[this.radio].data
  }
  private selectNav(event: Qtag) {
    this.radio = Number(event.label)
    this.lists = this.follows[Number(event.label)].data
  }
}
</script>

<style lang="scss" scoped>
.entry-nav {
  @include flexcenter($jc:space-between, $ai: center);
  padding: 2rem 1rem 2rem 2rem;
  border-bottom: 1px solid $border-color;
  color: $navcolor-header;
  &__title {
    font-size: 1.34rem;
    font-weight: bold;
    color: $title-color;
  }
}
</style>
