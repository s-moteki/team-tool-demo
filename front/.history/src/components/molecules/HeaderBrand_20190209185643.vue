<template>
  <div class="navbar-brand">
    <head-logo/>
    <header-burger/>
  </div>
</template>

<script>
import HeadLogo from '@/components/atoms/HeaderLogo.vue'
import HeaderBurger from '@/components/atoms/HederBurger.vue'

export default {
  name: 'HeaderBrand',
  components: {
    HeadLogo,
    HeaderBurger
  },
  mounted () {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('#'+ burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active')
        menu.classList.toggle('is-active')
    })
  }
}
</script>

<style scoped>
</style>
