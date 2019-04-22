<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Event" icon="fa-calendar-alt" size-class="is-one-quarter">Event</MenuItem>
    <MenuItem item-key="News" icon="fa-bell" size-class="is-one-quarter">News</MenuItem>
    <MenuItem item-key="Notice" icon="fa-rss" size-class="is-one-quarter">Notice</MenuItem>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
  name: 'HomeMenuBar',
  components: {
    MenuItem
  }
}

</script>

<style lang="scss">
.tabs{
  background-color: #FFFFFE;
  padding-bottom: 20px;
}
</style>
