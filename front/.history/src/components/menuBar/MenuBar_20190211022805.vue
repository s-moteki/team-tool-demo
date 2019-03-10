<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem title="Home" icon="fa-home"/>
    <MenuItem title="Notice" icon="fa-feed"/>
    <MenuItem title="Report" icon="fa-file-text"/>
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

<style>
.tabs{
  padding-bottom: 20px;
}
</style>
