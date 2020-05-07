<template>
  <div class="likes">
    <like-list :articles = likeList />
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

