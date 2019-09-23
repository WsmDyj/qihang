<template>
  <div class="title-wrapper">
    hello
  </div>
</template>

<script>
import { fetchget } from '../http/http'
export default {
  created () {
    fetchget('/api/blog/list').then(res => {
      console.log(res.data)
    })
  }
}
</script>
