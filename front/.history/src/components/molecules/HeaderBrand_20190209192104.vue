<template>
  <div class="navbar-brand">
    <head-logo/>
    <header-burger/>
  </div>
</template>

<script>
import HeadLogo from '@/components/atoms/HeaderLogo.vue'
import HeaderBurger from '@/components/atoms/HeaderBurger.vue'

export default {
  name: 'HeaderBrand',
  components: {
    HeadLogo,
    HeaderBurger
  }
}
</script>

<style scoped>
.is-active {
  display: initial;
}
</style>
