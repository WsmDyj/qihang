<template>
  <div class="about">
    <!-- <authorInfo type='comment' :size='40' :userInfo= user >
      <div slot="content" class="author-desc"></div>
    </authorInfo> -->
    <div class="about-content">
      <div class="about-item">
        <div class="item-name">未回答</div>
        <span class="item-count">332424244</span>
      </div>
      <div class="about-item">
        <div class="item-name">已解决</div>
        <span class="item-count">343</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import authorInfo from '../../authorInfo/index.vue'

@Component({
  components: {
    authorInfo
  },
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.about {
  width: 240px;
  border-radius: 3px;
  background: #fff;
  margin-bottom: 20px;
  padding: 12px 15px;
  box-sizing: border-box;
  .about-content {
    display: flex;
    justify-content: space-between;
    .about-item {
      text-align: center;
      position: relative;
      .item-name {
        color: $fontcolor;
        font-size: 13px;
        margin: 0 0 6px;
      }
      .item-count {
        font-weight: 500;
        font-size: 15px;
      }
    }
  }
}
</style>
