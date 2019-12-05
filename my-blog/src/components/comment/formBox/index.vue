<template>
  <div class="container" ref="formBox">
    <div class="comment-box" v-if="type != 'first' ">
      <span class="comment-time">{{formatDate(data.time)}}</span>
      <div class="comment-action" @click="showPopper= true">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-556cb17e="" fill="none" fill-rule="evenodd"><path data-v-556cb17e="" d="M0 0h20v20H0z"></path> <path data-v-556cb17e="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg> 
        <span class="action-title">回复</span>
      </div>
    </div>
    <div :class="type ? `form-box ${type} `: 'form-box' " v-show="showPopper">
      <el-input type="text" v-model="value" @focus="handleFocus" :placeholder="type == 'first' ? '请输入评论...': placeholder"></el-input>    
      <div v-show="firstVisible">
        <div class="submit" v-show="visible">
          <el-popover
            trigger="click"
            placement="bottom"
            >
            <div class="emojis">
              <div class="category" v-for="(emoji, index) in emojis" :key="index">
                <span @click="select(emoji)" class="item">{{emoji}}</span>
              </div>
            </div>
            <div slot="reference" class="emoji">
              <span class="emoji-icon"></span>
              <span class="emoji-text">表情</span>
            </div>
          </el-popover>
          <el-button :size="type == 'reply' ? 'mini' : 'small'" @click="submit" :disabled = disabled type="primary">评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { createComment, getComment, createReply } from '../../../api/comments'
import { UserModule }  from '../../../store/modules/user'

@Component
export default class extends Vue {
  @Prop() private type!: string
  @Prop() private data!: any
  private visible: boolean = false
  private firstVisible: boolean = true
  private placeholder: string = ''

  private showPopper: boolean = false
  private value: string = ''
  private emojis: string[] = ['😄', '😘', '😂', '😳', '😍', '👏', '👍','👎','😁','😉','😠','😞',
  '😥', '😭','😝','😡','💔','😣','😔','😄','😷','😚','😓','😊','😢','😜','😨','😰','😲','😏',
  '😱','😪','😖','😌','😒','👻','🎅','👧','👦','👩','👨','🐶','🐱','👊','✊','💪','👆','👇','👉','👈',
  '👌','💩']

  @Watch('type', {immediate: true})
  private typeChange(val: string) {
    this.showPopper = val === 'first' ? true : false
  }
  
  get disabled() {
    return this.value === '' ? true : false
  }
  get token() {
    return UserModule.token
  }

  @Emit('submit')
  private submit() {
    this.showPopper = false
    if (this.data) {
      Object.assign(this.data, {value: this.value})
      this.value = ''
      return this.data
    } else {
      this.showPopper = true
      this.firstVisible = false
      const result: string = this.value
      this.value = ''
      return result
    }
  }

  private handleFocus() {
    if (this.token) {
      this.visible = true
      this.firstVisible = true
    } else {
      UserModule.handleIslogin(true)
    }
  }

  private select(emoji: string) {
    this.value = `${this.value}${emoji}`
  }

  private showBtn() {
    this.visible = true
    this.placeholder = `回复${this.data.comment_author || this.data.nickname}...`
    document.addEventListener('click', this.hidePanel, false)
  }
  
  private hideBtn() {
    this.visible = false
    this.showPopper = this.type == 'first' ? true : false
    document.removeEventListener('click', this.hidePanel, false)
  }

  private hidePanel(e: any) {
    if (this.$refs.formBox && !(this.$refs.formBox as Element).contains(e.target)) {
      this.hideBtn()
    } else {
      this.showBtn()
    }
  }
 
  public created() {
    document.addEventListener("click", (e: any) => {
      this.hidePanel(e)
    })
  }

  public beforeDestroy() {
    this.hideBtn()
  }
}
</script>

<style lang="scss" scoped>
.comment-box {
  @include flexcenter($jc:space-between);
  color: #8a9aa9;
  margin-top: 12px;
  font-size: 12px;
  cursor: pointer;
  .comment-time {
    color: #8a9aa9;
    cursor: default;
  }
  .comment-action {
    @include flexcenter($jc: none);
    .action-title {
      padding: 0 5px;
    }
  }
}
.form-box {
  padding: 12px 16px;
  margin-top: 15px;
  background-color: #fafbfc;
  position: relative;
  border-radius: 3px;
  .submit {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .emoji {
      color: $primary;
      cursor: pointer;
      .emoji-icon {
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        background-image: url('../../../assets/svg/emoji.svg');
      }
      .emoji-text {
        font-size: 13px;
        padding-left: 5px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.reply {
  background: #fff;
  border: 1px solid #f1f1f2;
}
.first {
  padding: 0;
  margin-top: 0;
}
.emojis {
  max-width: 280px;
  max-height: 225px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 10px;
  .category {
    max-width: 280px;
    max-height: 225px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    .item {
      font-size: 22px;
      padding: 2px 3px;
      cursor: pointer;
      &:hover {
        transform: scale(1.2)
      }
      img {
        width: 22px;
        height: 22px;
        display: block;
      }
    }
  }
}

</style>
