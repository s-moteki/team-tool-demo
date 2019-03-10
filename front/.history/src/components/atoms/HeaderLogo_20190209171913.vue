<template>
  <div>
    <a class="navbar-item">
      {{title}}テスト
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
.navbar-item{
  color:#F06292;
}
</style>
