<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Home" icon="fa-calendar-alt">Event</MenuItem>
    <MenuItem item-key="News" icon="fa-bell">News</MenuItem>
    <MenuItem item-key="Notice" icon="fa-rss">Notice</MenuItem>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
  name: 'ReportMenuBar',
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
