<template>
  <div class="comment">
    <div class="comment-header">
      <author-info type="comment" size="medium" :userInfo= comment.userInfo>
      </author-info>
      <div @click="Adopt" class="comment-action" v-show="show">
        <el-button size='mini' :plain= visible true type="warning">{{!visible == 1 ? '已采纳': '采纳'}}</el-button>
      </div>
      <i v-show="!visible" class="iconfont">&#xe618;</i>
    </div>
    <div ref="article" v-highlight>
      <div class="article-content" v-html="comment.comment_conent"></div>
    </div>
    <formBox :data = comment @submit='handleSubmit' />
    <div v-show="comment.replys.length > 0">
      <reply @createReply='handleTwoReply' :replys = comment.replys :comment_id = comment.comment_id />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorInfo from '@/components/authorInfo/index.vue'
import { IComment, IReply } from '../../../api/types'
import formBox from '../../../components/comment/formBox/index.vue'
import reply from '../../../components/comment/reply/index.vue'
import GenNonDuplicateID from '../../../utils/createId'
import { createComment, getComment, createReply } from '../../../api/comments'
import { UserModule } from '../../../store/modules/user'
import { getAdoptComment } from '../../../api/actions'

@Component({
  components: {
    authorInfo,
    formBox,
    reply
  }
})
export default class extends Vue {
  @Prop() private comment!: IComment
  @Prop({default: false}) private show!: boolean
  private visible: boolean = false

  // 采纳
  private async Adopt() {
    let status: number = 0
    if (!this.visible) {
      status = 0
      this.visible = true
    } else {
      status = 1
      this.visible = false
    }
    await getAdoptComment({askId: this.$route.query.askId, comment_id: this.comment.comment_id, comment_status: status})
  }

  // 提交二级评论
  private async handleSubmit(val: any) {
    const reply: any = {
      article_id: this.$route.query.askId,
      comment_id: val.comment_id,
      reply_conent: val.value,
      reply_author: val.comment_author,
      reply_id: GenNonDuplicateID(),
    }
    await createReply(reply)
    this.$emit('submit')
  }
  // 提交三级评论
  private async handleTwoReply(event: IReply) {
    await createReply(event)
    this.$emit('submit')
  }

  private created() {
    this.visible = this.comment.comment_status == 1 ? false: true
  }
}
</script>

<style lang="scss" scoped>
.comment {
  padding: 20px;
  position: relative;
  .comment-header {
    display: flex;
    align-items: center;
    .comment-action {
      margin-left: 20px;
    }
    .iconfont {
      position: absolute;
      top: -3px;
      right: 0;
      color: $primary;
      font-size: 50px;
      }
  }
}
</style>
