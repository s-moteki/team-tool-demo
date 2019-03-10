<template>
  <section id="header">
    <nav class="navbar">
      <div class="container">
        <header-brand/>
        <!-- id-element is burger taget ....-->
        <div class="navbar-menu" id="navTarget">
          <div class="navbar-start is-link">
            <header-link title="About" />
            <header-link title="Help"/>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import HeaderBrand from '@/components/molecules/HeaderBrand.vue'
import HeadergLink from '@/components/atoms/HeaderLink.vue'

export default {
  name: 'Header',
  components: {
    HeaderBrand,
    HeadergLink
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
