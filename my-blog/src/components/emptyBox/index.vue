<template>
  <div class="empty-box">
    <svg width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon">
      <g fill="none" fill-rule="evenodd" transform="translate(4 3)">
        <g fill="#F7F7F7">
          <path
            d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z"
          />
        </g>
        <rect
          width="56"
          height="60"
          x="1.139"
          y="1.338"
          stroke="#EBEBEB"
          stroke-width="2"
          rx="6"
        />
      </g>
    </svg>
    <div class="empty-text">{{description}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() private description!: string
}
</script>

<style lang="scss" scoped>
.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 0;
  font-size: 13px;
  font-weight: bold;
  color: #b2bac2;
  cursor: default;
  user-select: none;
  background-color: #fff;
  .empty-text {
    font-size: 13px;
    margin-top: 14px;
    font-weight: 500;
    color: #b2bac2;
    cursor: default;
    user-select: none;
  }
}
</style>
