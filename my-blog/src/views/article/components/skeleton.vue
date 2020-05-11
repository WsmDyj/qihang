<template>
  <div class="main">
    <div class="section skeleton">
      <div class="skeleton-header">
      <div class="skeleton-header__avatar"></div>
      <div class="skeleton-header__content">
        <div class="skeleton-header__row"></div>
        <div class="skeleton-header__row"></div>
      </div>
    </div>
    <div class="skeleton-main"></div>
    <div class="skeleton-row"></div>
    <div class="skeleton-row__center"></div>
    <div class="skeleton-comment">评论</div>
    <div class="skeleton-footer">
      <div class="skeleton-footer__avatar"></div>
      <div class="skeleton-footer__row"></div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  
}
</script>

<style lang="scss" scoped>
.skeleton {
  background: #fff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  &-header {
    display: flex;
    align-items: center;
    &__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #eee;
      margin-right: 1rem
    }
    &__content {
      height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__row {
      width: 6rem;
      height: 1rem;
      background: #eee;
      &:last-child {
        width: 2.5rem;
        height: 0.8rem;
      }
    }
  }
  &-main {
    height: 40rem;
    background: #eee;
    margin-top: 2rem;
  }
  &-row {
    margin-top: 4rem;
    width: 50%;
    height: 3rem;
    background: #eee;
    &__center{
      width: 100%;
      margin-top: 2rem;
      background: #eee;
      height: 2rem;
    }
  }
  &-comment {
    margin-top: 4rem;
    text-align: center;
    color: #8a9aa9;
    font-size: 17px;
  }
  &-footer {
    margin-top: 4rem;
    display: flex;
    height: 3rem;
    &__avatar {
      width: 40px;
      height: 40px;
      background: #eee;
      border-radius: 50%;
    }
    &__row {
      flex: 1;
      height: 40px;
      margin-left: 2rem;
      background: #eee;
    }
  }
}
</style>