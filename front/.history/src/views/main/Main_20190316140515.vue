<template>
  <section id="team-tool" class="is-fullheight">
    <div class="header">
      <Header/>
      <MenuBar/>
    </div>
    <PageTitle class="title-area"/>
    <transition name="slide" appear >
        <router-view class="child"/>
    </transition>
  </section>
</template>

<script>
import Header from '@/components/header/Header'
import MenuBar from '@/components/menuBar/MenuBar'
import PageTitle from '@/components/pageTitle/PageTitle'

export default {
  name: 'Main',
  components: {
    Header,
    MenuBar,
    PageTitle
  }
}
</script>

<style scoped>
.header{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  max-width: 100%;
  height: 100px;
  z-index: 99;
}

.title-area{
  padding-top:120px;
}

.child{
  transition: all 1.2s ease;
  max-width: 100vw;
  margin-top:0px;
}

.slide-leave-active {
  position: absolute;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
