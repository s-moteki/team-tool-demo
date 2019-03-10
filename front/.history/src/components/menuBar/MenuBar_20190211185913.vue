<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Home" icon="fa-home"/>
    <MenuItem item-key="Notice" icon="fa-feed"/>
    <MenuItem item-key="Report" icon="fa-file-text"/>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
  name: 'MenuBar',
  components: {
    MenuItem
  }
}

</script>

<style lang="scss">
.tabs{
  padding-bottom: 20px;
}
</style>
