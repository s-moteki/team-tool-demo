<template>
  <div id="app ">
    <transition name="fade" appear mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
#app {
  background-color: #f5f5f5;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #546E7A;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
