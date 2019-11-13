<template>
  <div class="comment">
    <div class="comment-title">评论</div>
    <div class="comment-form">
      <el-avatar size="medium" :src= avatar></el-avatar>
      <div class="comment-input">
        <el-input v-model="comment_conent" @focus='visible=true' placeholder="请输入评论..."></el-input>
        <div v-show="visible" :style="{opacity: comment_conent ? 1 : 0.4}" @click="comment" class="action-box">评论</div>
      </div>
    </div>
    <div class="comment-content" v-for="(comment, index) in comments" :key="index" >
      <div class="comment-author">
        <el-avatar size="medium" :src= comment.userInfo.avatar></el-avatar>
      </div>
      <div class="comment-info">
        <div class="info-center">
          <span>{{comment.comment_author}}
          </span>
          <span style="color: #505050; font-size: 13px">{{comment.comment_conent}}</span>
        </div>
        <div class="info-time">
          <span>{{comment.comment_time}}</span>
          <div class="comment-action action">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-556cb17e="" fill="none" fill-rule="evenodd"><path data-v-556cb17e="" d="M0 0h20v20H0z"></path> <path data-v-556cb17e="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg> 
            <span class="action-title">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { IComment } from '../../api/types'
import formatDate from '../../utils/formatDate'
import { UserModule }  from '../../store/modules/user'

@Component
export default class extends Vue {
  @Prop() private comments!: IComment[]
  private visible: boolean = false
  private comment_conent: string = ''
  get avatar() {
    return UserModule.avatar
  }
  @Watch('comments')
  private watchTime(val: IComment[]) {
    val.forEach(item => {
      item.comment_time = formatDate(item.comment_time)
    })
  }
  @Emit('newComment')
  private comment() {
    this.visible = false
    const content = this.comment_conent
    this.comment_conent = ''
    return content
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
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    .info-center {
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .info-time {
      color: #8a9aa9;
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
  }
}
</style>
