<template>
  <div class="card">
    <cardModule title="🔥 热门问题">
      <div class="content-item" @click="handleClick(list)" v-for="(list, index) in hotList" :key="index">
        <div class="content-title">
          {{ list.title }}
        </div>
        <div class="content-action">
          <span>
            <i class="iconfont">&#xe60c;</i>
            {{ list.likeCount }}
          </span>
          <span class="action-comment">
            <i class="iconfont">&#xe631;</i>
            {{ list.comments }}
          </span>
        </div>
      </div>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'
import { Itag, Iquestion } from '../../../api/types'

@Component({
  components: {
    cardModule,
  },
})
export default class extends Vue {
  @Prop() private hotList!: Iquestion[]

  private handleClick(list: Iquestion) {
    window.open(`/checkAsk?askId=${list.question_id}`, '_blank')
  }
}
</script>
<style lang="scss" scoped>
.card {
  cursor: pointer;
  .content-item {
    padding: 12px 15px;
    &:hover {
      background: $hover-color;
    }
    .content-title {
      font-size: 15px;
      font-weight: 400;
      @include twoLines($clamp: 2);
    }
    .content-action {
      color: $fontcolor;
      margin-top: 8px;
      .action-comment {
        margin-left: 20px;
      }
    }
  }
}
</style>
