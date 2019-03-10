<template>
  <a>
    <span class="icon is-small">
      <i :class="['fa fa-1x fa-fw', icon]"></i>
    </span>
    <span>
      {{title}}
    </span>
  </a>
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
