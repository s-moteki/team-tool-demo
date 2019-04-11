<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Work" icon="fa-user-clock">Work</MenuItem>
    <MenuItem item-key="Cost" icon="fa-file-invoice-dollar">Cost</MenuItem>
    <MenuItem item-key="History" icon="fa-history">History</MenuItem>
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
