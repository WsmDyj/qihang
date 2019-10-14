<template>
  <div id="app">
    <my-upload field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="300"
      :height="300"
      url="/upload"
      :params="params"
      :headers="headers"
      img-format="png"></my-upload>
       <el-avatar fit="cover" :size="72" shape="square" :src="imgDataUrl"></el-avatar>
  </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    myUpload
  },
  data() {
    return{
      show: true,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: ''
    }
  },
  methods: {
    cropSuccess(imgDataUrl, field){
      this.imgDataUrl = imgDataUrl;
    },
    // 上传成功
    cropUploadSuccess(jsonData, field){
      console.log(jsonData);
    },
    // 上传失败
    cropUploadFail(status, field){
    }
  }
}
</script>
