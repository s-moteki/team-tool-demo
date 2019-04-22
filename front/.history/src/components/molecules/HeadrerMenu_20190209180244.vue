<template>
  <div class="navbar-menu" id="navTarget">
    <div class="navbar-start is-link">
      <header-link title="About" />
      <header-link title="Help"/>
    </div>
  </div>
</template>

<script>
import HeaderLink from '@/components/atoms/HeaderLink.vue';

export default {
  name: 'HeadrerMenu',
  components: {
    HeaderLink
  }
}
</script>
