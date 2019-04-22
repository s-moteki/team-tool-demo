<template>
  <section id="header">
    <nav class="navbar">
      <div class="container">
        <HeaderBrand/>
        <!-- id-element is burger taget ....-->
        <div class="navbar-menu" id="navTarget">
          <div class="navbar-start is-link">
            <HeaderLink title="About" url="#"/>
            <HeaderLink title="Help" url="#"/>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import HeaderBrand from '@/components/molecules/HeaderBrand.vue'
import HeaderLink from '@/components/atoms/HeaderLink.vue'

export default {
  name: 'Header',
  components: {
    HeaderBrand,
    HeaderLink
  },
  mounted () {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('#'+ burger.dataset.target)
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active')
        menu.classList.toggle('is-active')
    })
  }
}
</script>

<style scoped>
.is-active {
  display: initial;
}

.navbar{
  padding-top:3px;
  padding-bottom:5px;
  background-color: #F5F5F5;
}
</style>
