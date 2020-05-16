<template>
  <div class="reply">
    <div class="reply-content" v-for="(reply, index) in replys" :key="index" >
      <authorInfo type="comment" size="medium" :userInfo = reply>
        <div slot="content" class="reply-box">
          回复 
          <router-link target="_blank" :to="{path: '/author', query:{author: reply.reply_author}}">
            <span class="text">{{reply.reply_author}}</span>
          </router-link>：
          {{reply.reply_conent}}
        </div>
      </authorInfo>
      <div class="reply-info">
        <formBox type='reply' :data = reply  @submit='handleSubmit' />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { IReply, IComment } from '../../../api/types'
import GenNonDuplicateID from '../../../utils/createId'
import authorInfo from '../../authorInfo/index.vue'
import formBox from '../formBox/index.vue'

@Component({
  components: {
    authorInfo,
    formBox
  }
})
export default class extends Vue {
  @Prop() private replys!: IReply[]
  @Prop() private comment_id!: string

  private handleSubmit(val: any) {
    const reply: IReply = {
      comment_id: this.comment_id,
      reply_conent: val.value,
      reply_author: val.reply_author,
      reply_id: GenNonDuplicateID(),
    }
    this.$emit('createReply', reply)
  }
}
</script>

<style lang="scss" scoped>
.reply {
  margin-top: 1rem;
  padding: 1rem 1rem 0 1rem;
  background-color: #fafbfc;
  border-radius: 3px;
  .reply-content {
    border-bottom: 1px solid #f1f1f1;
    &:last-child {
      border-bottom: none;
    }
    .reply-box {
      color: #505050;
      font-size: 1.083333rem /* 13/12 */;
      line-height: 1.833rem;
      .text {
        color: #406599;
        &:hover {
          color: $primary;
          text-decoration: underline;
        }
      }
    }
    .reply-info {
      @include flexcolumn();
      box-sizing: border-box;
      padding-bottom: 1rem /* 10/14 */;
      padding-left: 4.3rem /* 46/14 */;
    }
  }
}

</style>
