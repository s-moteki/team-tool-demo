<template>
  <transition name="list" appear>
    <div class="has-text-centered text-area" :key="activeTitle">
      <h1 >{{activeTitle}}</h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PageTitle',
  data () {
    return {
      titles: {event: '直近の予定', news: '社内更新', notice: 'お知らせ'}
    }
  },
  computed: {
    activeTitle() {
      return this.titles[this.$store.state.childPage.currentChild]
    }
  }
}
</script>

<style scoped>
.text-area{
  position: absolute;
  left:0;
  right:0;
}

.list-enter-active, .list-leave-active {
  transition: all 1.2s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(-70px);
}
</style>
