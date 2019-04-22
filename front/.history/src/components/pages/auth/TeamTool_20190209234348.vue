<template>
  <section id="team-tool">
    <Header/>
    <TabMenu/>
    <transition name="slide" appear >
      <component
      v-bind:is="currentTab"
      class="tab"
      ></component>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/organsms/Header.vue'
import TabMenu from '@/components/organsms/TabMenu.vue'

import Heading from '@/components/partial/Heading.vue'

import Home from '@/components/pages/auth/Home.vue'
import Notice from '@/components/pages/auth/Notice.vue'
import Chat from '@/components/pages/auth/Chat.vue'

export default {
  name: 'TeamTool',
  data () {
    return {
      currentTab: 'Notice',
      tabs:[
        ['Home','fa-home'],
        ['Notice','fa-feed'],
        ['Report','fa-file-text']
      ]
    }
  },
  components: {
    Header,
    TabMenu,
    Heading,
    Home,
    Notice,
    Chat
  }
}

</script>

<style scoped>
.slide-leave-active {
  position: absolute;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
