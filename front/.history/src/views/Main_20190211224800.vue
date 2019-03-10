<template>
  <section id="main is-fullheight">
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

<style scoped lang="scss">
.main{
  height: 100%;
}
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
