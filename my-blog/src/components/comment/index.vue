<template>
  <div id="comment" class="comment">
    <div class="comment-title">评论</div>
    <div class="comment-form">
      <el-avatar fit="cover" size="medium" :src= avatar></el-avatar>
      <div class="comment-input">
        <formBox type='first' @submit='createComment' />
      </div>
    </div>
    <div class="comment-content" v-for="(comment, index) in comments" :key="index" >
      <authorInfo type="comment" size="medium" :userInfo = comment.userInfo>
        <span slot="content" class="comment-text">{{comment.comment_conent}}</span>
      </authorInfo>
      <div class="comment-info">
        <formBox :data = comment @submit='handleSubmit' />
        <div v-show="comment.replys.length > 0">
          <reply @createReply='handleTwoReply' :replys = comment.replys :comment_id = comment.comment_id />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import reply from './reply/index.vue'
import authorInfo from '../authorInfo/index.vue'
import formBox from './formBox/index.vue'

import { UserModule }  from '../../store/modules/user'
import { createComment, getComment, createReply } from '../../api/comments'
import { IComment, IReply } from '../../api/types'
import GenNonDuplicateID from '../../utils/createId'

export interface Scommon {
  article_id: string | (string | null)[]
  comment_id: string
  reply_conent?: string
  reply_author?: string
  reply_id?: string
  comment_conent?: string
}

@Component({
  components: {
    reply,
    authorInfo,
    formBox
  }
})
export default class extends Vue {
  private comments: IComment[] = []

  get avatar() {
    return UserModule.avatar
  }

  // 提交一级评论
  private async createComment(val: string) {
    const comment: Scommon = {
      article_id: this.$route.query.articleId,
      comment_conent: val,
      comment_id: GenNonDuplicateID()
    }
    await createComment(comment)
    this.getComment()
  }
  // 提交二级评论
  private async handleSubmit(val: any) {
    const reply: Scommon = {
      article_id: this.$route.query.articleId,
      comment_id: val.comment_id,
      reply_conent: val.value,
      reply_author: val.comment_author,
      reply_id: GenNonDuplicateID(),
    }
    await createReply(reply)
    this.getComment()
  }
  // 提交三级评论
  private async handleTwoReply(event: IReply) {
    await createReply(event)
    this.getComment()
  }
  // 获取评论列表
  private async getComment() {
    const { data } = await getComment({ article_id: this.$route.query.articleId })
    this.comments = data
  }
  private async created() {
    this.getComment()
  }
}
</script>

<style lang="scss" scoped>
.comment-title {
  color: #8a9aa9;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  padding: 1.571429rem /* 22/14 */ 0 5px;
}
.comment-form {
  display: flex;
  position: relative;
  margin-top: 1.428571rem /* 20/14 */;
  padding: .857143rem /* 12/14 */ 1.142857rem /* 16/14 */;
  background-color: #fafbfc;
  border-radius: 3px;
  .comment-input {
    width: 100%;
    margin-left: 1.071429rem /* 15/14 */;
  }
}
.comment-content {
  margin: 1.428571rem /* 20/14 */ 2.142857rem /* 30/14 */ 1.428571rem /* 20/14 */ 3.571429rem /* 50/14 */;
  border-bottom: 1px solid #f1f1f1;
  &:last-child {
    border-bottom: none;
  }
  .comment-text {
    color: #505050;
    font-size: 1rem /* 14/14 */;
    margin-top: .571429rem /* 8/14 */;
  }
  .comment-info {
    @include flexcolumn();
    box-sizing: border-box;
    padding-bottom: 1.071429rem /* 15/14 */;
    padding-left: 3.285714rem /* 46/14 */;
  }
}
</style>
