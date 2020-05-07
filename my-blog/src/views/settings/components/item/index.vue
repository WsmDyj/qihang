<template>
  <div class="setting-item">
    <div class="title">{{ header }}</div>
    <slot name="avatar"/>
    <div class="action-box" v-if="title !== 'avatar'">
      <div class="center">
        <el-input :autofocus= show @focus="show = true" @blur="blur" v-model="value"></el-input>
      </div>
      <div v-if="show" class="agree action-button">
        <span class="confirm" @click.stop="confirm">保存</span>
        <span class="cancel" @click.stop="show = false">取消</span>
      </div>
      <div v-else @click="show = true" class="edit action-button">
        <i class="el-icon-edit"></i>
        <span>修改</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
interface IsetItemTitle  {
  label: string
  value: string
}

const defaultIsetItemTitle: IsetItemTitle[] = [
  { label:'头像', value: 'avatar' }, 
  { label:'姓名', value: 'nickname' },
  { label:'职业', value: 'job' },
  { label:'公司', value: 'company' },
  { label:'个人介绍', value: 'autograph' }
]

@Component
export default class extends Vue {
  @Prop() private title!: string
  @Prop() private info!: string

  private show: boolean = false
  private value: string = ''

  @Watch('info', {immediate: true})
  private watchInfo(val: string) {
    this.value = val
  }
  
  get header(): string {
    const curTitle = defaultIsetItemTitle.filter(item => item.value === this.title)
    return curTitle[0].label
  }
  private blur() {
    if(this.info === this.value) {
      this.show = false
    }
  }
  @Emit('updateInfo')
  private confirm() {
    this.show = false
    let _info: any = {}
    _info[this.title] = this.value
    return _info
  }
}
</script>
<style lang="scss">
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  border-top: 1px solid #f1f1f1;
  &:first-child {
    padding: 12px 0;
  }
  .title {
    color: #333;
    width: 120px;
  }
  .action-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .center {
      color: #909090;
      flex-wrap: 600;
      flex: 1;
      .edit-info {
        outline: none;
      }
    }
    .action-button {
      cursor: pointer;
      color: #007fff;
      font-size: 14px;
      .confirm {
        font-weight: 600;
      }
      .cancel {
        color: #666;
        margin-left: 5px;
      }
    }
  }
  .box {
    flex: 1;
    display: flex;
    margin-left: 12px;
    .box-button {
      margin-left: 30px;
      .box-toolitp {
        margin-bottom: 18px;
        font-size: 12%;
        color: #909090;
        font-weight: 600;
      }
    }
  }
  .el-input .el-input__inner{
    border: 1px solid #fff !important;
  }
  .el-input.is-disabled .el-input__inner {
    background: #fff;
    cursor: auto;
    color: #909090;
  }
}

</style>