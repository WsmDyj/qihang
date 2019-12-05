<template>
  <div class="likes">
    <div v-if="likeList.length > 0">
      <like-list :articles = likeList />
    </div>
    <div v-else>
      <emptyBox />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import likeList from '../../homeArticle/index.vue'
import { IArticleData  } from '../../../../api/types'
import emptyBox from '../../../emptyBox/index.vue'
@Component({
  components: {
    likeList,
    emptyBox
  }
})
export default class extends Vue {
  @Prop() private likeList!: IArticleData[]
}
</script>

