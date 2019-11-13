<template>
  <div class="info-row meta-row">
    <div class="item avatar" v-if="isAvatar">
      <el-avatar size="medium" :src= avatar></el-avatar>
    </div>
    <div class="item post" v-else>专栏</div>
    <div class="item author">{{ article.author }}</div>
    <div class="createtime">{{ articleTime }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../api/types'
import { UserModule } from '../../store/modules/user'
import formatDate from '../../utils/formatDate'

@Component
export default class extends Vue {
  @Prop() private article!: IArticleData
  @Prop() private isAvatar!: boolean
  private articleTime: string =''
  get avatar() {
    return UserModule.avatar
  }
  created() {
    this.articleTime = formatDate(this.article.createtime)
  }
}
</script>

<style lang="scss" scoped>
.info-row {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #909090;
  font-size: 14px;
}
.meta-row {
  color: #b2bac2;
  .item {
    position: relative;
    &::after {
      content: "·";
      color: #b2bac2;
      margin: 0px 2px;
    }
  }
  .avatar {
    padding-right: 10px;
    &::after {
      display: none;
    }
  }
  .post {
    font-weight: 500;
    color: #b71ed7;
  }
}
</style>

