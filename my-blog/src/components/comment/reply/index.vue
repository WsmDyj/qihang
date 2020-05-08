<template>
  <div class="reply">
    <div class="reply-content" v-for="(reply, index) in replys" :key="index" >
      <authorInfo type="reply" size="medium" :userInfo = reply>
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
  margin-top: 1.428571rem /* 20/14 */;
  padding: .857143rem /* 12/14 */ 1.142857rem /* 16/14 */;
  background-color: #fafbfc;
  border-radius: 3px;
  .reply-content {
    margin-top: .714286rem /* 10/14 */;
    border-bottom: 1px solid #f1f1f1;
    &:last-child {
      border-bottom: none;
    }
    .reply-box {
      color: #505050;
      font-size: .857143rem /* 12/14 */;
      margin-top: .571429rem /* 8/14 */;
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
      padding-bottom: .714286rem /* 10/14 */;
      padding-left: 3.285714rem /* 46/14 */;
    }
  }
}

</style>
