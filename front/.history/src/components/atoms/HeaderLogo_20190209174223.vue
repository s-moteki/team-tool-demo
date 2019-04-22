<template>
  <div>
    <a class="navbar-item" href="url">
      {{title}}テスト
    </a>
  </div>
</template>

<script>
export default {
  name: 'HeaderLink',
  props: {
    title: String,
    url: String
  }
}
</script>

<style scoped>
.navbar-item{
  color:#F06292;
}
</style>
