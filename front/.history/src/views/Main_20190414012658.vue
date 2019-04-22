<template>
  <section id="team-tool" class="is-fullheight">
    <!-- ヘッダー -->
    <div class="header">
      <Header/>
      <transition name="slide">
        <component :is="currentMenuBar"/>
      </transition>
    </div>

    <!-- ページタイトル -->
    <PageTitle class="title-area"/>

    <!-- エラー表示 -->
    <transition name="fade" appear>
      <div class="err has-text-centered child" v-if="isError">
        <p class="is-size-5">情報の取得に失敗しました
          <br>一度サインアウトして
          <br>しばらくしてから接続してください
        </p>
        <p><br>※別のタブでも開いている場合は閉じてください</p>
      </div>
    </transition>

    <!-- タブページ内容 -->
    <transition name="slide" appear>
      <router-view class="child"/>
    </transition>
  </section>

</template>

<script>
import Header from '@/components/header/Header'
import HomeMenuBar from '@/components/menuBar/HomeMenuBar'
import ReportMenuBar from '@/components/menuBar/ReportMenuBar'
import PageTitle from '@/components/pageTitle/PageTitle'

export default {
  name: 'Main',
  components: {
    Header,
    HomeMenuBar,
    ReportMenuBar,
    PageTitle
  },
  computed: {
    // childページのエラー状態
    isError () {
      return this.$store.state.childPage.error
    },
    // カレントメニューバー
    currentMenuBar () {
      const menuName = this.$store.state.menu.currentMenu
      return `${menuName.charAt(0).toUpperCase()}${menuName.slice(1)}MenuBar`
    }
  }
}
</script>

<style scoped>
.err{
	position: absolute;
	top: 50%;
	left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
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
  width: 100vw;
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

.list-enter-active, .list-leave-active {
  transition: all 1.2s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(-70px);
}
</style>
