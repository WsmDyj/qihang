<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      class="back-to-ceiling"
      @click="backToTop"
    >
    <i style="font-size:20px" class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BackToTop'
})
export default class extends Vue {
  @Prop({ default: 100 }) private visibilityHeight!: number
  @Prop({ default: 'fade' }) private transitionName!: string
  @Prop({ default: 0 }) private backPosition!: number

  private visible = false
  private isMoving = false
  private interval?: number

  mounted() {
    window.addEventListener('scroll', this.handleScroll,true)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private handleScroll() {
    this.visible = window.pageYOffset > this.visibilityHeight
  }

  private backToTop() {
    if (this.isMoving) return
    const start = window.pageYOffset
    let i = 0
    this.isMoving = true
    const interval = setInterval(() => {
      const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
      if (next <= this.backPosition) {
        window.scrollTo(0, this.backPosition)
        clearInterval(interval)
        this.isMoving = false
      } else {
        window.scrollTo(0, next)
      }
      i++
    }, 16.7)
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }
}
</script>

<style lang="scss" scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  background-color: #fff;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  color: #409eff;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0,.12)
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.back-to-ceiling .backTopIcon {
  fill: #9aaabf;
  background: none;
}
</style>
