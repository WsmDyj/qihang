<template>
  <div class="entry">
    <div class="entry-nav">
      <div class="entry-nav__title">关注</div>
      <div class="entry-nav__tabs">
        <tabs splitLine = true :tabs = tabs @click="selectNav" />
      </div>
    </div>
     <div class="list-empty" v-if="isEmpty" >
      <empty description="这里空空如也" />
    </div>
    <van-list v-else>
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
import empty from '@/components/emptyBox/index.vue'
import tabs from '@/components/tabs/index.vue'
import { Qtag } from '../../../global'
import { getfollowList } from '../../../api/follow'
@Component({
  components: { 
    empty,
    authorList,
    tabs
  }
})
export default class extends Vue {
  @Prop() private follows!: IFollow[]
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private lists: IFollow[] = []
  private radio: number = 0
  private tabs: Qtag[] = [
    { value: '关注了', label: '0'},
    { value: '关注者', label: '1'},
  ]
  
  @Watch('follows',{immediate: true})
  private watchFollows(val: IFollow[]) {
    this.lists = val[this.radio].data
    if (val[this.radio].data.length <= 0) {
      this.isEmpty = true
    }
  }
  private selectNav(event: Qtag) {
    this.radio = Number(event.label)
    this.isEmpty = false
    this.lists = this.follows[Number(event.label)].data
    if (this.follows[Number(event.label)].data.length <= 0) {
      this.isEmpty = true
    }
  }
  private async getFollow(params: any) {
    const { data } = await getfollowList({username: params})
    this.follows = data
  }
}
</script>

<style lang="scss" scoped>
.entry-nav {
  @include flexcenter($jc:space-between, $ai: center);
  padding: 1rem 0rem 1rem 2rem;
  border-bottom: 1px solid $border-color;
  background-color: #fff;
  color: $navcolor-header;
  @media only screen and (max-width: 768px) { 
    padding: 1rem;
  }
  &__title {
    font-size: 1.34rem;
    font-weight: bold;
    color: $title-color;
  }
  &__tabs {
    width: 11rem;
  }
}
</style>
