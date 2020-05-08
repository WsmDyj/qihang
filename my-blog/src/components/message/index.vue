<template>
  <div class="message">
  <div @click="dialogVisible=true" class="live-message">
    <i class="iconfont">&#xe61c;</i>
  </div>
   <div class="dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
        title="意见反馈"
        >
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
          <el-form-item label="反馈渠道" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="交流分享"></el-radio>
              <el-radio label="产品建议"></el-radio>
              <el-radio label="网站Bug"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="意见内容" prop="content">
            <el-input style="width:80%" :autosize="{ minRows: 3, maxRows: 5}" type="textarea" placeholder="请输入内容" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input style="width:50%" v-model="ruleForm.phone" placeholder="请输入真实联系方式（邮箱、QQ)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'message'
})
export default class extends Vue {
  private dialogVisible: boolean = false
  private ruleForm:any = {
    resource: '交流分享',
    content: '',
    phone: ''
  }
  
}
</script>

<style lang="scss" scoped>
.live-message {
  position: fixed;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  right: 3.571429rem /* 50/14 */;
  bottom: 3.571429rem /* 50/14 */;
  width: 40px;
  height: 40px;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0,0,0,.05);
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0,.12)
  }
  .iconfont {
    font-size: 16px;
    color: #007fff;
    font-weight: 500;
  }
  @media only screen and (max-width: 750px) { 
    display: none
  }
}
</style>
