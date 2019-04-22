<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half l">
          <p class="subtitle is-4">あなた</p>
        </div>
        <div class="column is-half r">
          <p class="subtitle is-4">全体</p>
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
