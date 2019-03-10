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

import Heading from '@/components/partial/Heading.vue'

import Home from './mainTabs/Home.vue'
import Notice from './mainTabs/Notice.vue'
import Report from './mainTabs/Report'

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
    TabMenu,
    Heading,
    Home,
    Notice,
    Report
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
