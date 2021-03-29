<template>
  <div :class="`icon__lightning position__${position}`">
    <svg @mouseenter="hovered = true" @mouseleave="hovered = false">
      <use :xlink:href="iconHref"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LightningIcon',
  props: ['position'],
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    iconHref() {
      return `#icon-lightning-${this.position}${this.hovered ? '-hover' : ''}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/components/lightning'
</style>