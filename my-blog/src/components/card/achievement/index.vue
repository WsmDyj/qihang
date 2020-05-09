<template>
  <div :style="{position: author ? 'sticky' : ''}" class="card">
    <cardModule :title = title >
      <div class="card-body">
        <div style="padding-bottom: 10px;" v-if="author">
          <!-- <div class="card-item" >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25" class="icon stat-author-icon"><defs data-v-b0eaf47e="" data-v-3670f9b4=""><circle data-v-b0eaf47e="" data-v-3670f9b4="" id="a" cx="12.5" cy="12.5" r="12.5"></circle></defs> <g data-v-b0eaf47e="" data-v-3670f9b4="" fill="none" fill-rule="evenodd"><mask data-v-b0eaf47e="" data-v-3670f9b4="" id="b" fill="#fff"><use data-v-b0eaf47e="" data-v-3670f9b4="" xlink:href="#a"></use></mask> <use data-v-b0eaf47e="" data-v-3670f9b4="" fill="#E1EFFF" xlink:href="#a"></use> <g data-v-b0eaf47e="" data-v-3670f9b4="" mask="url(#b)"><g data-v-b0eaf47e="" data-v-3670f9b4="" fill="#7BB9FF" fill-rule="nonzero"><path data-v-b0eaf47e="" data-v-3670f9b4="" d="M10.273 20.16l-.978-2.297-2.477.302 2.51-4.325 1.164 1.9 2.29.095z"></path> <path data-v-b0eaf47e="" data-v-3670f9b4="" d="M14.827 20.16l.978-2.297 2.477.302-2.51-4.325-1.164 1.9-2.29.095z"></path></g> <path data-v-b0eaf47e="" data-v-3670f9b4="" fill-rule="nonzero" stroke="#E1EFFF" stroke-width="1.5" d="M7 10.5a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0z"></path> <path data-v-b0eaf47e="" data-v-3670f9b4="" fill="#7BB9FF" fill-rule="nonzero" d="M7.002 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0zm5.769-2.422a.3.3 0 0 0-.543 0l-.655 1.398-1.496.228a.3.3 0 0 0-.17.506L11 11.33l-.255 1.56a.3.3 0 0 0 .442.311l1.312-.725 1.315.726a.3.3 0 0 0 .44-.311L14 11.329l1.092-1.119a.3.3 0 0 0-.169-.506l-1.496-.228-.656-1.398z"></path></g></g></svg>
            <span class="center">掘金优秀作者</span>
          </div> -->
          <div class="card-item" >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" class="icon stat-jp-icon"><g data-v-ef4dec54="" data-v-d17dae02="" fill="none" fill-rule="evenodd"><circle data-v-ef4dec54="" data-v-d17dae02="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path data-v-ef4dec54="" data-v-d17dae02="" fill="#7BB9FF" d="M16.694 13.516l-3.719 3.055a1.1 1.1 0 0 1-1.412-.013l-2.77-2.362-3.597 2.437a.693.693 0 0 1-.895-.101.649.649 0 0 1-.008-.876l3.68-4.096a1.1 1.1 0 0 1 1.507-.122l2.653 2.135 2.248-2.4-1.34-1.358a.5.5 0 0 1 .327-.85l5.438-.313a.5.5 0 0 1 .528.533l-.368 5.449a.5.5 0 0 1-.855.317l-1.417-1.435z"></path></g></svg>
            <span class="center">文章被评论数 {{userInfo.comments}}</span>
          </div>
        </div>
        <div class="card-item" v-else>
          <authorInfo :userInfo = userInfo>
            <div slot="content" class="author-desc">{{userInfo.job}} @{{userInfo.company || '添加公司'}}</div>
          </authorInfo>
        </div>
        <div class="card-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" class="zan"><g data-v-b0eaf47e="" data-v-3670f9b4="" fill="none" fill-rule="evenodd" transform="translate(0 .57)"><ellipse data-v-b0eaf47e="" data-v-3670f9b4="" cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse> <path data-v-b0eaf47e="" data-v-3670f9b4="" fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path></g></svg>
          <span class="center">获得点赞数 {{userInfo.likes}}</span>
        </div>
        <div class="card-item">
          <svg data-v-70685a54="" data-v-3d7951e8="" width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon"><g data-v-70685a54="" data-v-3d7951e8="" fill="none" fill-rule="evenodd"><circle data-v-70685a54="" data-v-3d7951e8="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path data-v-70685a54="" data-v-3d7951e8="" fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path></g></svg>
          <span class="center">文章被阅读数 {{userInfo.reviews}}</span>
        </div>
      </div>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'
import { IUserInfo } from '../../../api/types'
import authorInfo from '../../authorInfo/index.vue'
@Component({
  components: {
    cardModule,
    authorInfo
  }
})
export default class extends Vue {
  @Prop() private title!: string
  @Prop() private userInfo!: IUserInfo
  @Prop() private author!: boolean
}
</script>
<style lang="scss" scoped>
.card {
  // position: sticky;
  top: 80px;
  .card-body {
    padding: 12px 15px;
    .card-item {
      @include flexcenter($jc: none);
      @include nowrap;
      padding-bottom: 10px;
      &:last-child {
        padding-bottom: 0px;
      }
      .center {
        flex: 1 1 auto;
        margin-left: 10px;
        font-size: 15px;
      }
      .author-desc {
        width: 130px;
        @include nowrap();
      }
    }
  }
}
</style>
