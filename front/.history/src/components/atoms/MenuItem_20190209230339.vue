<template>
  <div :class="{active: true}">
    <a>
      <span class="icon is-small">
        <i :class="['fa fa-1x fa-fw', icon]"></i>
      </span>
      <span>
        {{title}}
      </span>
    </a>
  <div>
</template>

<script>
export default{
  name: 'MenuItem',
  props: {
    icon: String,
    title: String
  }
}
</script>

<style scoped>
a{
  color: #F06292;
  border-bottom-color: #F06292;
  border-bottom-width: 2px;
}

.active a{
  color: #6495ed;
  border-bottom-color: #6495ed;
}

</style>
