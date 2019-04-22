<template>
  <section class="hero is-primary">
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
export default {
  name: 'Home',
  data () {
    return {
      test:$store.test
    }
  }
}
</script>

<style scoped>
</style>
