<template>
  <div :class="['column is-one-quarter is-narrow',{active: isActive}]">
    <router-link :to="sendUrl" class="tab">
      <span class="icon is-small">
        <i :class="['fa fa-1x fa-fw', icon]"></i>
      </span>
      <span>
        {{title}}
      </span>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'MenuItem',
  props: {
    icon: String,
    title: String
  },
  computed: {
    isActive: function () {
      return this.title === this.$store.childPage.state.currentChild
    },
    sendUrl: function() {
      return '/' + this.title.toLowerCase()
    }
  }
}
</script>

<style scoped>
.tab{
  color: #F06292;
  border-bottom-color: #F06292;
  border-bottom-width: 2px;
}

.active .tab{
  color: #6495ed;
  border-bottom-color: #6495ed;
}


</style>
