<template>
  <section id="team-tool">
    <Header/>
    <!-- <Heading/> -->
    <div class="columns is-mobile is-multiline tabs is-gapless is-centered">
      <div v-for="tab in tabs"
          :class="{active: tab[0] === currentTab}"
          :key="tab[0]"
          v-on:click="currentTab = tab[0]"
          class="column is-one-quarter is-narrow"
          >
        <a>
          <span class="icon is-small">
            <i :class="['fa fa-1x fa-fw', tab[1]]"></i>
          </span>
          <span>{{tab[0]}}</span>
        </a>
      </div>
    </div>
    <transition name="slide" appear mode="out-in">
      <component
      v-bind:is="currentTab"
      class="tab"
      ></component>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/partial/Header.vue'
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
        ['Chat','fa-comment']
      ]
    }
  },
  components: {
    Header,
    Heading,
    Home,
    Notice,
    Chat
  }
}

</script>

<style scoped>
.tabs{
  padding-bottom: 20px;
}

a{
  color: #fc9d9d;
  border-bottom-color: #fc9d9d;
}

.tab{
  transition: all 0.8s ease;
}

.active a{
  color: #00ffff;
  border-bottom-color: #00ffff;
}

.slide-leave-active {
  position: absolute;
}
.slide-enter {
  transform: translateY(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
