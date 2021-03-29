<template>
  <section class="modal" @mousedown="closeModal">
    <Animated appear name="fadeIn" :duration="600">
      <section @mousedown.stop class="modal__window">
        <header class="modal__header">
          <div class="flex">
            <h3>{{ title }}</h3>
            <div v-if="$store.getters['get_modal'] === 'select_token'" class="question" content="Find a token by searching for its name or symbol or by pasting its address below." v-tippy="{ placement : 'right' }">
              <div class="question_icon">
                <svg><use xlink:href="#icon-question"></use></svg>
              </div>
            </div>
          </div>
          <div class="right__header">
            <span @click="closeModal" class="close">&times;</span>
          </div>
        </header>
        <div aria-modal="true" role="dialog" tabindex="-1" aria-label="dialog" class="modal__content">
          <slot></slot>
        </div>
      </section>
    </Animated>
  </section>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: ['title'],
  mounted() {
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) this.closeModal()
    })
  },
  methods: {
    closeModal() {
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/components/modal'
</style>