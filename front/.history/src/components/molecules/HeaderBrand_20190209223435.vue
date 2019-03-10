<template>
  <div class="navbar-brand">
    <HeaderLogo/>
    <HeaderBurger/>
  </div>
</template>

<script>
import HeaderLogo from '@/components/atoms/HeaderLogo.vue'
import HeaderBurger from '@/components/atoms/HeaderBurger.vue'

export default {
  name: 'HeaderBrand',
  components: {
    HeaderLogo,
    HeaderBurger
  }
}
</script>

<style scoped>
.is-active {
  display: initial;
}
</style>
