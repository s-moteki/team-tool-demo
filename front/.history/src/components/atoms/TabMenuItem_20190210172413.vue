<template>
  <div
   :class="['column is-one-quarter is-narrow',{active: isActive}]"
   @click="onClickItem"
   >
    <a>
      <span class="icon is-small">
        <i :class="['fa fa-1x fa-fw', icon]"></i>
      </span>
      <span>
        {{title}}
      </span>
    </a>
  </div>
</template>

<script>
export default{
  name: 'TabMenuItem',
  props: {
    icon: String,
    title: String
  },
  computed: {
    isActive: function () {
      return this.title === this.$store.state.tabmenu.currentTab
    },
    sendUrl: function() {
      return '/team-tool/' + this.title.toLowerCase()
    }
  },
  methods: {
    onClickItem: function() {
      this.$store.commit('tabmenu/setCurrentTab',this.title);
      this.$router.push(this.sendUrl)
    }
  }
}
</script>

<style scoped>
a{
  color: #F06292;
  border-bottom-color: #F06292;
  border-bottom-width: 2px;
}

.active  a{
  color: #6495ed;
  border-bottom-color: #6495ed;
}

</style>
