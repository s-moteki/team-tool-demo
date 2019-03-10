<template>
  <section id="team-tool">
    <Header/>
    <MenuBar/>
    <transition name="slide" appear >
      <router-view class="child"/>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/commons/Header'
import MenuBar from '@/components/menuBar/MenuBar'
import Heading from '@/components/partial/Heading'

export default {
  name: 'Main',
  components: {
    Header,
    MenuBar,
    Heading
  }
}
</script>

<style scoped>
.slide-leave-active {
  position: absolute;
}

.child{
  transition: all 0.8s ease;
}

.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
