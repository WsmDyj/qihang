<template>
  <div class="comment">
    <div class="comment-title">评论</div>
    <div class="comment-form">
      <el-avatar size="medium" :src= avatar></el-avatar>
      <div class="comment-input">
        <el-input v-model="comment_conent" @focus='visible=true' placeholder="请输入评论..."></el-input>
        <div v-show="visible" :style="{opacity: comment_conent ? 1 : 0.4}" @click="createComment" class="action-box">评论</div>
      </div>
    </div>
    <div class="comment-content" v-for="(comment, index) in comments" :key="index" >
      <div class="comment-author">
        <el-avatar size="medium" :src= comment.userInfo.avatar></el-avatar>
      </div>
      <div class="comment-info">
        <div class="info-center">
          <div>{{comment.comment_author}}
            <span style="font-size:12px;color: #8a9aa9;">{{comment.userInfo.job}}</span>
          </div>
          <span style="color: #505050; font-size: 14px; margin-top:8px">{{comment.comment_conent}}</span>
        </div>
        <div class="info-time">
          <span>{{comment.comment_time}}</span>
          <div class="comment-action action" @click="reply(comment, index)">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-556cb17e="" fill="none" fill-rule="evenodd"><path data-v-556cb17e="" d="M0 0h20v20H0z"></path> <path data-v-556cb17e="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg> 
            <span class="action-title">回复</span>
          </div>
        </div>
        <div class="info-input" v-show="comment.showReply">
          <el-input v-model="reply_conent" :autofocus = comment.showReply :placeholder="replyPlaceholder"></el-input>
          <div :style="{opacity: reply_conent ? 1 : 0.4}" @click="handleReply(comment)" class="action-box">评论</div>
        </div>
        <div v-show="comment.replys.length > 0">
          <reply @createReply='handleTwoReply' :replys = comment.replys :comment_id = comment.comment_id />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { IComment, IReply } from '../../api/types'
import formatDate from '../../utils/formatDate'
import { UserModule }  from '../../store/modules/user'
import { createComment, getComment, createReply } from '../../api/comments'
import GenNonDuplicateID from '../../utils/createId'
import reply from './reply/index.vue'

@Component({
  components: {
    reply
  }
})
export default class extends Vue {
  private comments: IComment[] = []
  private visible: boolean = false
  private replyPlaceholder: string = ''
  private comment_conent: string = ''
  private reply_conent: string = ''
  get avatar() {
    return UserModule.avatar
  }
  @Watch('comments')
  
  private reply(comment: IComment) {
    comment.showReply = true
    this.comments.forEach(item => {
      if (item.comment_id != comment.comment_id) {
        item.showReply = false
      }
    })
    this.replyPlaceholder = `回复${comment.comment_author}...`
  }
  
  // 提交一级评论
  private async createComment() {
    const comment: any = {
      article_id: this.$route.query.articleId,
      comment_conent: this.comment_conent,
      comment_likes: 0,
      comment_id: GenNonDuplicateID()
    }
    await createComment(comment)
    this.getComment()
    this.comment_conent = ''
  }
  // 提交二级评论按钮
  private async handleReply (comment: IComment) {
    const reply: IReply = {
      comment_id: comment.comment_id,
      reply_conent: this.reply_conent,
      reply_id: GenNonDuplicateID(),
      reply_author: comment.comment_author,
    }
    this.reply_conent = ''
    await createReply(reply)
    this.getComment()
  }
  private async handleTwoReply(event: IReply) {
    await createReply(event)
    this.getComment()
  }
  // 获取评论列表
  private async getComment() {
    const { data } = await getComment({ article_id: this.$route.query.articleId })
    for (var i = 0; i<data.length; i++) {
      data[i].comment_time = formatDate(data[i].comment_time)
      data[i].replys.forEach((item:any) => {
        item.reply_time = formatDate(item.reply_time)
        Object.assign(item, {showReply: false})
      })
      Object.assign(data[i], {showReply: false})
    }
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
  padding: 22px 0 5px;
}
.comment-form {
  display: flex;
  position: relative;
  margin-top: 20px;
  padding: 12px 16px;
  background-color: #fafbfc;
  border-radius: 3px;
  .comment-input {
    width: 100%;
    margin-left: 20px;
    .action-box {
      height: 33px;
      width: 60px;
      line-height: 33px;
      margin-top: 10px;
      font-size: 15px;
      float: right;
      font-weight: 600;
      text-align: center;
      color: #fff;
      background-color: #027fff;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
.comment-content {
  margin-top: 10px;
  display: flex;
  margin: 20px 30px 20px 50px;
  .comment-author {
    padding: 0 10px;
  }
  .comment-info {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    .info-center {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .info-time {
      color: #8a9aa9;
      margin-top: 15px;
      cursor: default;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .action {
        display: flex;
        align-items: center;
        .action-title {
          padding: 0 10px;
        }
      }
    }
    .info-input {
      padding: 12px 16px;
      margin-top: 15px;
      background-color: #fafbfc;
      .action-box {
        height: 33px;
        width: 60px;
        line-height: 33px;
        margin-top: 10px;
        font-size: 15px;
        float: right;
        font-weight: 600;
        text-align: center;
        color: #fff;
        background-color: #027fff;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
