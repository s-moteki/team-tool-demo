<template>
  <section id="header">
    <nav class="navbar">
      <div class="container">
        <HeaderBrand/>
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
import HeadingBrand from '@/components/molecules/HeaderBrand.vue'
import HeadingLink from '@/components/atoms/HeaderLink.vue'

export default {

}
</script>
