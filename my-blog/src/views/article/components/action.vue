<template>
  <div class="action">
    <div @click="getLike" ref="likeContent" class="panel-btn like-btn with-badge" :badge='likes'></div>
    <a href="#comment">
      <div class="panel-btn comment-btn with-badge" :badge='article.comments'>
    </div>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { IArticleData } from '../../../api/types'
import { UserModule } from '../../../store/modules/user'
import { ArticleModule } from '../../../store/modules/article'
import { getlikeArticle, removelike } from '../../../api/actions'
@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
  private active: boolean = false
  private likes: number = 0

  get token() {
    return UserModule.token
  }

  get likeArticlId() {
    return ArticleModule.likeArticlId
  }

  private getLike() {
    this.token ? this.handleLike(this.article) : UserModule.handleIslogin(true)
  }

  @Watch('article', {immediate: true})
  private watchArticle(val:IArticleData) {
    this.active = this.likeArticlId.indexOf(val.article_id) != -1
    this.likes = val.likeCount
    if (this.active) {
      (this.$refs.likeContent as HTMLFormElement).classList.add('active')
    }
  }

  private async handleLike(article: IArticleData) {
    const data = this.$refs.likeContent as HTMLFormElement
    if (!this.active) {
      await getlikeArticle({article_id: article.article_id})
      this.likes = this.likes + 1
      this.active = true 
      data.classList.add('active')
    } else {
      await removelike({article_id: article.article_id})
      this.likes = this.likes - 1
      this.active = false
      data.classList.remove('active')
    }
  }
}
</script>

<style lang="scss" scoped>
.action {
  position: fixed;
  margin-left: -80px;
  top: 25%;
  .panel-btn {
    position: relative;
    background-position: 53% 46%;
    margin-bottom: 30px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .like-btn {
    background-image: url('../../../assets/svg/zan.svg');
  }
  .comment-btn {
    background-image: url('../../../assets/svg/comment.svg');
  }
  .with-badge::after {
    content: attr(badge);
    position: absolute;
    top: 0;
    left: 75%;
    padding: 3px 6px;
    font-size: 12px;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    background-color: #b2bac2;
    border-radius: 8px;
    transform-origin: left top;
    transform: scale(.75);
  }
  .active {
    background-image: url('../../../assets/svg/zan-active.svg');
    &::after {
      background-color: #6cbd65;
    }
  }
}
</style>
