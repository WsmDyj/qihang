<template>
  <div class="popove">
    <authorInfo :userInfo = userInfo>
      <span slot="content" class="author-desc">{{userInfo.job}} @{{userInfo.company}}</span>
    </authorInfo>
    <div class="popove-action">
      <div class="follows" v-for="(item, index) in userInfo.followInfo" :key="index">
        <span class="follows-count">{{item.count}}</span>
        <span class="follows-item">{{item.title}}</span>
      </div>
      <follow size='small' :author = userInfo.nickname />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorInfo from '../../authorInfo/index.vue'
import follow from '../../follow/index.vue'
import { IUserInfo } from '../../../api/types'

@Component({
  components: {
    authorInfo,
    follow
  }
})
export default class extends Vue {
  @Prop() private userInfo!: IUserInfo
  
}
</script>

<style lang="scss" scoped>
 .popove {
   padding: 20px;
   width: 200px;
  .popove-action {
    margin-top: 20px;
    @include flexcenter($jc: space-between, $ai:flex-end);
    .follows {
      @include flexcolumn($ai:center, $jc:none);
      cursor: default;
      .follows-count {
        font-size: 17px;
        font-weight: 600;
        color: #333;
      }
      .follows-item {
        font-size: 14px;
        color: #b2bac2;
        margin-top: 4px;
      }
    }
  }
}
</style>
