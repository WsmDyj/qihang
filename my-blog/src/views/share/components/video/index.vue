<template>
  <div class="videos">
    <div class="share-video">
      <div class="video-conent" >
        <div class="video-item" v-for="(item, index) in videos" :key="index">
          <videoCard :list= item />
        </div>
      </div>
    </div>
    <el-divider>千学不如一看，千看不如一练</el-divider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getSharelist } from '../../../../api/actions'
import { IVideo, Itag} from '../../../../api/types'
import videoCard from '../videoCard.vue'


@Component({
  components: {
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

<style lang="scss" scoped>
.videos {
  position: relative;
  .share-video {
    width: 968px;
    .video-conent {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

</style>
