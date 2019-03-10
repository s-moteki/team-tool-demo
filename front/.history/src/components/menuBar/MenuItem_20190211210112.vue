<template>
  <div :class="['column is-one-quarter is-narrow',{active: isActive}]">
    <router-link :to="linkTo" class="tab">
      <span class="icon is-small">
        <i :class="['fa fa-1x fa-fw', icon]"></i>
      </span>
      <span>
        {{itemKey}}
      </span>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'MenuItem',
  props: {
    icon: String,
    itemKey: String
  },
  computed: {
    isActive: function () {
      return this.itemKey.toLowerCase() === this.$store.state.childPage.currentChild
    },
    linkTo: function() {
      return '/' + this.itemKey.toLowerCase()
    }
  }
}
</script>

<style scoped lang="scss">
$color-link: #F06292;
$color-link-active: #6495ed;

.tab{
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
