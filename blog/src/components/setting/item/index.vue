<template>
  <div class="item">
    <div class="title">{{ header }}</div>
    <slot name="avatar"/>
    <div class="action-box" v-if="title !== 'avatar'">
      <div class="center">
        <el-input @focus="focus" @blur="blur" v-model="value"></el-input>
      </div>
      <div v-if="show" class="agree action-button">
        <span class="confirm" @click.stop="confirm">保存</span>
        <span class="cancel" @click.stop="cancel">取消</span>
      </div>
      <div v-else class="edit action-button">
        <i class="el-icon-edit"></i>
        <span>修改</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    info: {
      type: String
    }
  },
  data() {
    return {
      show:  false,
      value: ''
    }
  },
  computed: {
    header() {
      const array = [
        { label:'头像',value: 'avatar' }, 
        { label:'姓名',value: 'nickname' },
        { label:'职业',value: 'job' },
        { label:'公司',value: 'company' },
        { label:'个人介绍',value: 'autograph' }]
      const curTitle = array.filter(item => item.value === this.title)
      return curTitle[0].label
    },
  },
  watch: {
    info: {
      handler(val) {
        this.value = val
      },
      immediate: true
    }
  },
  methods: {
    blur() {
      if(this.info === this.value) {
        this.show = false
      }
    },
    focus() {
      this.show = true
    },
    confirm() {
      this.show = false
      const _info = {}
      _info[this.title] = this.value
      this.$emit('updateInfo', _info)
    },
    cancel() {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
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
}
</style>