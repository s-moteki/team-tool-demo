<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half l">
          First column
        </div>
        <div class="column is-half r">
          Second column
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Analysis'
}
</script>

<style scoped lang="scss">
.container{
  padding-top: 30px;
}
.l{
  background-color: red;
}

.r{
  background-color: blue;
}
</style>
