<template>
  <div>
    <a class="navbar-item">
      {{title}}about
    </a>
  </div>
</template>

<script>
export default {
  name: 'HeaderLink',
  props: {
    title : String
  }
}
</script>

<style scoped>
#about{
  color:#F06292;
}
</style>
