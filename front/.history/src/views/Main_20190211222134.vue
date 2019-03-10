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
  computed: {
    currentComponent: function() {
      const currentTab = this.$store.state.tabmenu.currentTab
      return currentTab.slice( 0, 1 ).toUpperCase()
       + currentTab.slice( 1 )
    }
  },
  components: {
    Header,
    TabMenu
  }
}
</script>

<style>
section{
  padding-top: 0px;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.5) 2%, rgba(0, 0, 0, 0.5) 100%), -webkit-radial-gradient(51% 97%, #E8E8E8 7%, #CCCCCC 97%);
  background: linear-gradient(-180deg, rgba(255, 255, 255, 0.5) 2%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(51% 97%, #E8E8E8 7%, #CCCCCC 97%);
  background-blend-mode: multiply;
}
</style>

<style scoped lang="scss">

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
