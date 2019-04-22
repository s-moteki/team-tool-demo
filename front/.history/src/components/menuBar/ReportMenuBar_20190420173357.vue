
<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <MenuItem item-key="Attendance" icon="fa-user-clock" size-class="is-two-fifths">Attendance</MenuItem>
    <MenuItem item-key="analysis" icon="fa-file-invoice-dollar" size-class="is-two-fifths">Analysis</MenuItem>
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
