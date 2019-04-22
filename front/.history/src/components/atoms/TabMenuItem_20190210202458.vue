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
        <slot>
          default
        </slot>
      </span>
    </a>
  </div>
</template>

<script>
export default{
  name: 'TabMenuItem',
  props: {
    icon: String
  },
  computed: {
    isActive: function () {
      return this.title === this.$store.state.tabmenu.currentTab
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
