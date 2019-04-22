<template>
  <section class="hero is-primary">
    <Heading>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{test}}
        </h1>
        <h2 class="subtitle">
          Primary subtitle
        </h2>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Primary title
        </h1>
        <h2 class="subtitle">
          Primary subtitle
        </h2>
      </div>
  </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Primary title
        </h1>
        <h2 class="subtitle">
          Primary subtitle
        </h2>
      </div>
    </div>
  </section>

</template>

<script>
import Heading from '@/components/partial/Heading.vue'

export default {
  name: 'Home',
  computed: {//算出プロパティ
    test() {
      return this.$store.state.test.test
    }
  },
  components: {
    Heading
  }
}
</script>

<style scoped>
</style>
