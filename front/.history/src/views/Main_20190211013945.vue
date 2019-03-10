<template>
  <section id="team-tool">
    <Header/>
    <TabMenu/>
    <transition name="slide" appear >
      <component
      v-bind:is="currentComponent"
      class="tab"
      ></component>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/commons/Header.vue'
import TabMenu from '@/components/tabMenu/TabMenu.vue'

export default {
  name: 'Main',
  components: {
    Header,
    TabMenu
  }
}
</script>

<style scoped>
.slide-leave-active {
  position: absolute;
}

.tab{
  transition: all 0.8s ease;
}

.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
