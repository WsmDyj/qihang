<template>
  <div class="content">
    <el-upload
      class="avatar-uploader"
      :auto-upload="false" multiple
      :file-list="imgBroadcastList"
      action=""
      :on-change="imgBroadcastChange"
      :on-error="handleAvatarError"
      :show-file-list='false'
      >
      <el-button size="mini" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import uploadImgToBase64 from '../../../../utils/uploadImgToBase64'

@Component({
})

export default class extends Vue {
  private imgBroadcastList: any[] = []
  @Emit('upload')
  private async imgBroadcastChange(file:any, fileList:any[]) {
    this.imgBroadcastList = []
    const isLt2M = file.size / 1024 / 1024 < 2  // 上传头像图片大小不能超过 2MB
    if (!isLt2M) {
      this.imgBroadcastList = fileList.filter(v => v.uid !== file.uid)
      this.$message.error('图片选择失败，每张图片大小不能超过 2MB,请重新选择!')
    } else {
      this.imgBroadcastList.push(file)
    }
    const response: any = await uploadImgToBase64(this.imgBroadcastList[0].raw)
    return response.result
  }
  handleAvatarError() {
    this.$message.error('上传头像失败')
  }
}
</script>