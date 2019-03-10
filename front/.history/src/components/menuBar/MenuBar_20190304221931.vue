<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Home" icon="fa-home">Home</MenuItem>
    <MenuItem item-key="Report" icon="fa-file-text">Report</MenuItem>
    <MenuItem item-key="Notice" icon="fa-feed">お知らせ</MenuItem>
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
  background-color: #FFFFFE;
  padding-bottom: 20px;
}
</style>
