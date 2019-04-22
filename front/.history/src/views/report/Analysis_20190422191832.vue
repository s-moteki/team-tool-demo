<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half l">
          <p class="subtitle is-4">あなた</p>
          <p class="subtitle is-5 has-text-centered">1ヶ月間の平均残業時間</p>
          <p class="subtitle is-4 has-text-centered">15.6時間</p>
          <p class="subtitle is-5 has-text-centered">1ヶ月間の平均残業日数</p>
          <p class="subtitle is-4 has-text-centered">15日</p>
          <p class="subtitle is-5 has-text-centered">累計残業時間</p>
          <p class="subtitle is-4 has-text-centered">1500.6時間</p>
        </div>
        <div class="column is-half r">
          <p class="subtitle is-4 has-text-centered">全体</p>
          <p class="subtitle is-5 has-text-centered"></p>
          <p class="subtitle is-5 has-text-centered">月間平均残業日数</p>
          <p class="subtitle is-5 has-text-centered">累計残業時間</p>
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
