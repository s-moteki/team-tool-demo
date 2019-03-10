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
.tab{
  color: $color-base-link;
  border-bottom-color: $color-base-link;
  border-bottom-width: 2px;
}

.active{
  .tab{
    color: $palette-blueGauloise;
    border-bottom-color: $palette-blueGauloise;
  }
}

</style>
