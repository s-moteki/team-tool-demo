<template>
  <div :class="['column is-half is-narrow',{active: isActive}]">
    <router-link :to="linkTo" class="tab">
      <span class="icon is-small">
        <i :class="['fa fa-1x fa-fw', icon]"></i>
      </span>
      <span>
        <slot></slot>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: String,
    itemKey: String
  },
  computed: {
    isActive () {
      return this.itemKey.toLowerCase() === this.$store.state.childPage.currentChild
    },
    linkTo () {
      return `/${this.$store.state.menu.currentMenu}/${this.itemKey.toLowerCase()}`
    }
  }
}
</script>

<style scoped lang="scss">
$color-link: #2c3e50;
$color-link-active: #42b983;

.tab{
  transition: 1.2s ;
  color: $color-link;
  border-bottom-color:$color-link;
  border-bottom-width: 2px;
}

.active{
  .tab{
    color: $color-link-active;
    border-bottom-color: $color-link-active;
  }
}

</style>
