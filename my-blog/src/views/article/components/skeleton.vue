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
    <div class="skeleton-main mg-top-20"></div>
    <div class="skeleton-row mg-top-30"></div>
    <div class="skeleton-row__center"></div>
    <div class="skeleton-comment mg-top-40">评论</div>
    <div class="skeleton-footer mg-top-40">
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
    @media only screen and (max-width: 767px) {
      height: 20rem;
    }
  }
  &-row {
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
    text-align: center;
    color: #8a9aa9;
    font-size: 17px;
  }
  &-footer {
    display: flex;
    height: 3rem;
    margin-bottom: 2rem;
    @media only screen and (max-width: 767px) {
      height: 15rem;
    }
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