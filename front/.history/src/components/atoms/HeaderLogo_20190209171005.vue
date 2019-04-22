<template>
  <div>
    <a class="navbar-item">
      {{title}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'HeaderLink',
  props: ['title']
}
</script>

<style scoped>
#about{
  color:#F06292;
}
</style>
