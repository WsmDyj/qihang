<template>
  <div class="content">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list='false'
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-upload="beforeAvatarUpload">
      <el-button size="mini" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  methods: {
    handleAvatarSuccess(res, file) {
      const imageUrl = URL.createObjectURL(file.raw);
      if (!imageUrl) {
        this.$message.error('上传头像失败')
      }
      this.$emit('getAvatarUrl', {avatar: imageUrl})
    },
    handleAvatarError() {
      this.$message.error('上传头像失败')
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}
</script>