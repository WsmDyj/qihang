<template>
  <div>
    <div
      :class="isSticky ? className : '' "
      :style="{top: (isSticky ? stickyTop +'px' : ''), zIndex: zIndex, position: position, width: width,}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Sticky'
})
export default class extends Vue {
  @Prop({ default: 0 }) private stickyTop!: number
  @Prop({ default: 0 }) private fixedTop!: number
  @Prop({ default: 1 }) private zIndex!: number
  @Prop({ default: '' }) private className!: string


  private active:boolean = false
  private position:string = ''
  private isSticky:boolean = false
  private width:string = 'auto'
  private height:string = 'auto'

  mounted() {
    this.height = this.$el.getBoundingClientRect().height.toString() + 'px'
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  activated() {
    this.handleScroll()
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  private sticky() {
    if (this.active) {
      return
    }
    this.position = 'fixed'
    this.active = true
    this.width = this.width + 'px'
    this.isSticky = true
  }

  private handleReset() {
    if (!this.active) {
      return
    }
    this.position = ''
    this.width = 'auto'
    this.active = false
    this.isSticky = false
  }

  private handleScroll() {
    const width = this.$el.getBoundingClientRect().width
    this.width = (width.toString() + 'px') || 'auto'
    const offsetTop = this.$el.getBoundingClientRect().top
    this.$emit('scroll', offsetTop < this.fixedTop ? false : true)
    if (offsetTop < this.stickyTop) {
      this.sticky()
      return
    }
    this.handleReset()
  }

  private handleResize() {
    if (this.isSticky) {
      this.width = this.$el.getBoundingClientRect().width.toString() + 'px'
    }
  }
}
</script>
