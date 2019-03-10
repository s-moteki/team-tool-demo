<template>
  <section id="team-tool" class="is-fullheight">
    <div class="header">
      <Header/>
      <MenuBar/>
    </div>
    <transition class="children" name="slide" mode="out-in" appear >
      <router-view class="child"/>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/commons/Header'
import MenuBar from '@/components/menuBar/MenuBar'

export default {
  name: 'Main',
  components: {
    Header,
    MenuBar
  }
}
</script>

<style scoped>

.header{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
  z-index: 99;
}

.child{
  transition: all .7s ease;
  padding-top: 120px;
}

.slide-leave-active {
  position: absolute;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-leave-to {
  opacity: 0;
}
</style>
