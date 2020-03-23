<template>
  <div class="card">
    <cardModule title="🔥 热门问题">
      <div class="content">
        <div class="content-item" v-for="(list, index) in hotList" :key="index">
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
      </div>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'

@Component({
  components: {
    cardModule,
  },
})
export default class extends Vue {
  private hotList: any[] = [
    {title: '前端效能提升之不可忽略的插件',likeCount: '12',comments: '123'},
    {title: '前端效能提升之不可忽略的插件',likeCount: '12',comments: '123'},
    {title: '前端效能提升之不可忽略的插件',likeCount: '12',comments: '123'},
    {title: '前端效能提升之不可忽略的插件',likeCount: '12',comments: '123'},
    {title: '前端效能提升之不可忽略的插件',likeCount: '12',comments: '123'},
  ]
  
}
</script>
<style lang="scss" scoped>
.card {
  cursor: pointer;
  .content {
    margin-top: 10px;
    .content-item {
      padding: 12px 15px;
      &:hover {
        background: $hoverBg;
      }
      .content-title {
        font-size: 15px;
        font-weight: 400;
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
}
</style>
