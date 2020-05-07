<template>
  <div class="follow">
    <div class="nav">
      <div class="nav-title">问答</div>
      <div class="nav-details panel-box">
        <el-radio-group @change="changeFollowType" v-model="radio">
          <el-radio class="details" :label="0">我的问题</el-radio>
          <el-radio class="details" :label="1">我回答的</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-if="asks.length > 0">
      <div class="questions-content" v-for="(ask, index) in asks" :key="index">
        <question-item :ask = ask @delete='deleteAsk' origin='author' />
      </div>
    </div>
    <div v-else>
      <emptyBox tootip='这里空空如也' />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Message, MessageBox } from 'element-ui'
import emptyBox from '../../../emptyBox/index.vue'
import questionItem from '../../../../views/questions/components/item.vue'
import { Iquestion } from '../../../../api/types'
import { getAskList, deleteAsk, getAnswerList } from '../../../../api/question'
@Component({
  components: { 
    emptyBox,
    questionItem
  }
})
export default class extends Vue {
  private radio: number = 0
  private asks: Iquestion[] = []

  private async changeFollowType() {
    if (this.radio === 1) {
      const { data } = await getAnswerList({author: this.$route.query.author})
      this.asks = data
    } else {
      this.getList()
    }
  }
  deleteAsk(item: string) {
    MessageBox.confirm(
      '您确定删除这个问题吗？删除之后可能无法找回了',
      '确定删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async () => {
      deleteAsk({ask_id: item})
      this.getList()
      Message({
        message: '删除成功',
        type: 'success',
        duration: 5 * 1000
      })
    })
  }
  private async getList () {
    const { data } = await getAskList({author: this.$route.query.author, articleTag: '全部', status: 0})
    this.asks = data
  }
  private async created() {
   this.getList()
  }
}
</script>

<style lang="scss" scoped>
.nav {
  @include flexcenter($jc:space-between);
  padding: 20px 20px 20px 30px;
  border-bottom: 1px solid $border-color;
  color: #72777B;
  .nav-title {
    font-size: 16px;
    font-weight: 600;
    color: #2e3135;
  }
  .details {
    position: relative;
    display: inline-block;;
    &:first-child {
      padding: 0 10px;
      @include splitLine($right: 0)
    }
  }
}

</style>
