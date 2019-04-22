<template>
  <section id="team-tool" class="is-fullheight">
    <div class="header">
      <Header/>
      <MenuBar/>
    </div>
    <PageTitle class="title-area"/>

    <div class="err has-text-centered child" v-if="isError">
      <p class="is-size-5">情報の取得に失敗しました<br>しばらくしてから接続してください
      </br>別のタブでも開いている場合は閉じてください</br>
    </div>

    <transition name="slide" appear>
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
  },
  computed : {
    isError(){
      return this.$store.state.childPage.error
    }
  }
}
</script>

<style scoped>
.err{
  padding-top:170px;
}

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
  padding-top:170px;
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
