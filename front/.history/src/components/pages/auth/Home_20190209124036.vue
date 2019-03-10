<template>
  <section class="hero is-primary">
    <Header/>
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
import Header from '@/components/partial/Header.vue'

export default {
  name: 'Home',
  computed: {//算出プロパティ
    test() {
      return this.$store.state.test.test
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
</style>
