<template>
  <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
    <TabMenuItem title="Home" icon="fa-home"/>
    <TabMenuItem title="Notice" icon="fa-feed"/>
    <TabMenuItem title="Report" icon="fa-file-text"/>
  </div>
</template>

<script>
import TabMenuItem from './TabMenuItem.vue'

export default {
  name: 'MenuBar',
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
