<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <TabMenuItem icon="fa-home">Home</TabMenuItem>
    <TabMenuItem icon="fa-feed"/>Notice</TabMenuItem>
    <TabMenuItem icon="fa-file-text">Report</TabMenuItem>
  </div>
</template>

<script>
import TabMenuItem from '@/components/atoms/TabMenuItem.vue'

export default {
  name: 'TabMenu',
  components: {
    TabMenuItem
  }
}

</script>

<style>
.tabs{
  padding-bottom: 20px;
}
</style>
