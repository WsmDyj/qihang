<template>
  <div class="container">
    <Header />
    <div class="main">
      <Setting />
    </div>
  </div>
</template>
<script>
import Header from '../components/header'
import Setting from '../components/srtting'
export default {
  components: {
    Header,
    Setting
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main {
    position: relative;
    width: 932px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>