<template>
  <div class="navbar-start is-link">
    <header-link title="About" />
    <header-link title="Help"/>
  </div>
</template>

<script>
import HeaderLink from '@/components/atoms/HeaderLink.vue';

export default {
  name: 'HeadrerNavigation',
  components: {
    HeaderLink
  }
}
</script>
