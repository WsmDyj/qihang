<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="share-video">
        <div class="video-title">
          <span class="video-icon"></span>
          <span class="video-name">视频推荐</span>
        </div>
        <div class="video-conent" >
          <div class="video-item" v-for="(item, index) in videos" :key="index">
            <videoCard :list= item />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import videoCard from './components/videoCard.vue'
import { getSharelist } from '../../api/actions'
import { IVideo } from '../../api/types'
@Component({
  name: 'share',
  components: {
    Header,
    videoCard
  }
})

export default class extends Vue {
  private videos:IVideo[] = []
  private async created() {
    const { data } = await getSharelist()
    this.videos = data
  }
}
</script>

<style lang="scss">
.container {
  @include flexcolumn($jc:center, $ai: center);
  .main {
    width: 970px;
    margin-top: 80px;
    margin-bottom: 20px;
    position: relative;
    .share-video {
      width: 970px;
      .video-title {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid rgba(230, 230, 231, 1);
        margin-bottom: 20px;
        .video-icon {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-image: url('../../assets/svg/shareVideo.svg');
          vertical-align: middle;
        }
        .video-name {
          font-size: 16px;
          margin-left: 15px;
          vertical-align: middle;
          color: $primary;
          font-weight: 500;
        }
      }
      .video-conent {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
