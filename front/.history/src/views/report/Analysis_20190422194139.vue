<template>
  <section class="section">
    <div class="container">
      <div class="columns has-text-centered">
        <div class="column is-half">
          <p class="subtitle is-4">あなた<i class="fas fa-user"></i></p>
          <p class="is-size-4">今月の残業時間</p>
          <p class="subtitle is-2">21時間</p>
          <p class="is-size-4">今月の残業日数</p>
          <p class="subtitle is-2">3日</p>
          <p class="is-size-4">平均月別残業時間</p>
          <p class="subtitle is-2">12.6時間</p>
        </div>
        <div class="column is-half">
          <p class="subtitle is-4">全体</p>
          <p class="is-size-4">今月の平均残業時間</p>
          <p class="subtitle is-2">21時間</p>
          <p class="is-size-4">今月の平均残業日数</p>
          <p class="subtitle is-2">3日</p>
          <p class="is-size-4">平均月別残業時間</p>
          <p class="subtitle is-2">12.6時間</p>
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

</style>
