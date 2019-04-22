<template>
  <section class="section">
    <transition name="fade-fast" mode="out-in">
      <div v-if="result" class="container">
        <div class="columns has-text-centered">
          <div class="column is-half">
            <p class="subtitle is-4"><i class="fas fa-2x fa-user"></i> あなた</p>
            <p class="is-size-4">今月の残業時間</p>
            <p class="subtitle is-2">{{result.you.minute/60}}時間</p>
            <p class="is-size-4">今月の残業日数</p>
            <p class="subtitle is-2">{{result.you.workdate}}日</p>
            <p class="is-size-4">1日の平均残業時間</p>
            <p class="subtitle is-2">{{result.you.minute/60}}時間</p>
          </div>
          <div class="column is-half">
            <p class="subtitle is-4"><i class="fas fa-2x fa-users"></i> 全体</p>
            <p class="is-size-4">今月の平均残業時間</p>
            <p class="subtitle is-2">21時間</p>
            <p class="is-size-4">今月の平均残業日数</p>
            <p class="subtitle is-2">3日</p>
            <p class="is-size-4">1日の平均残業時間</p>
            <p class="subtitle is-2">12.6時間</p>
          </div>
        </div>
      </div>
      <Loading v-else-if="showLoading"/>
    </transition>
  </section>
</template>

<script>
//n.toFixed(1)
import axios from 'axios'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'Analysis',
  data () {
    return {
      result: null,
      showLoading: true,
      user_oid: sessionStorage.userOid
    }
  },
  components: {
    Loading
  },
  mounted () {
    axios.get(`http://localhost:8888/api/attendance-analysis?id=${this.user_oid}`)
    .then(response => {
      this.result = response.data
    }).catch(err => {
      this.$store.commit('childPage/setError', true)
      this.showLoading = false
    })
  }
}
</script>

<style scoped lang="scss">
.container{
  padding-top: 30px;
}

.column{
  padding-bottom: 50px;
}
</style>
