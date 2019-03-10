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
  computed: {//算出プロパティ
    test: function() {
      return 'Test'
    }
  }
}
</script>

<style scoped lang="scss">
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.tab{
  transition: all 0.8s ease;
}
</style>
