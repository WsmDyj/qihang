<template>
  <div class="reply">
    <div class="comment-content" v-for="(reply, index) in replys" :key="index" >
      <div class="comment-author">
        <el-avatar size="medium" :src='reply.avatar'></el-avatar>
      </div>
      <div class="comment-info">
        <div class="info-center">
          <div>{{reply.comment_author}}
          </div>
          <span style="color: #505050; font-size: 13px; margin-top:8px">
            回复 
            <span>{{reply.reply_author}}</span>：
            {{reply.reply_conent}}</span>
        </div>
        <div class="info-time">
          <span>{{reply.reply_time}}</span>
          <div class="comment-action action" @click="handleReply(reply, index)">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-556cb17e="" fill="none" fill-rule="evenodd"><path data-v-556cb17e="" d="M0 0h20v20H0z"></path> <path data-v-556cb17e="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg> 
            <span class="action-title">回复</span>
          </div>
        </div>
        <div class="info-input" v-show="reply.showReply">
          <el-input v-model="reply_conent" :autofocus = reply.showReply :placeholder="replyPlaceholder"></el-input>
          <div :style="{opacity: reply_conent ? 1 : 0.4}" @click="createReply(reply)" class="action-box">评论</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import formatDate from '../../../utils/formatDate'
import { IReply, IComment } from '../../../api/types'
import GenNonDuplicateID from '../../../utils/createId'

@Component
export default class extends Vue {
  @Prop() private replys!: IReply[]
  @Prop() private comment_id!: string
  private lists!: IReply[]
  private replyPlaceholder: string = ''
  private reply_conent: string =''
  @Watch('replys',{immediate: true})

  
  private handleReply(reply: IReply) {
    reply.showReply = true
    this.replyPlaceholder = `回复${reply.comment_author}...`
    this.replys.forEach(item => {
      if(item.reply_id != reply.reply_id) {
        item.showReply = false
      }
    })
  }
  @Emit('createReply')
  private createReply(event: IComment) {
   const reply: IReply = {
      comment_id: this.comment_id,
      reply_conent: this.reply_conent,
      reply_id: GenNonDuplicateID(),
      reply_author: event.comment_author,
    }
    this.reply_conent = ''
    return reply
  }
}
</script>

<style lang="scss" scoped>
.reply {
  margin-top: 20px;
  padding: 12px 16px;
  background-color: #fafbfc;
  border-radius: 3px;
  .comment-content {
    margin-top: 10px;
    display: flex;
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
}

</style>
