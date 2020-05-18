<template>
  <div class="videos">
    <div class="share-video">
      <div class="video-conent" >
        <div class="video-item" v-for="(item, index) in videos" :key="index">
          <videoCard :list= item />
        </div>
        <!-- <div class="video-item" v-if="videos.length % 2 !== 0"></div> -->
      </div>
    </div>
    <div class="divider">
      <span class="divider-split"></span>
      <span class="divider-content">千学不如一看，千看不如一练</span>
      <span class="divider-split"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getSharelist } from '../../../../api/actions'
import { IVideo, Itag } from '../../../../api/types'
import videoCard from '../videoCard.vue'


@Component({
  components: {
    videoCard
  }
})
export default class extends Vue {
  private videos:IVideo[] = []
  private async created() {
    const { data } = await getSharelist({type: 'video'})
    this.videos = data
  }
}
</script>

<style lang="scss" scoped>
.videos {
  position: relative;
  margin-left: 1rem;
  .share-video {
    width: 100%;
    .video-conent {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      .video-item {
        margin-right: 1.2rem;
      }
    }
  }
}
.divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 30px 0;
  font-size: 1.083333rem;
  color: $navcolor;
  &-split {
    flex: 1;
    display: inline-block;
    height: 1px;
    background-color: $navcolor;
    opacity: .2;
    margin: 0 2rem;
    
  }
}
</style>
