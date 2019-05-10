<template>
  <section class="section">
    <transition name="fade-fast" mode="out-in">
        <div v-if="result" class="columns has-text-centered">
          <div class="column is-half">
            <p class="subtitle is-4"><i class="fas fa-2x fa-user"></i> あなた</p>
            <p class="is-size-4">今月の残業時間</p>
            <p class="subtitle is-2">{{getWotkTime(result.you.minute)}}時間</p>
            <p class="is-size-4">今月の残業日数</p>
            <p class="subtitle is-2">{{result.you.workdate}}日</p>
            <p class="is-size-4">1日の平均残業時間</p>
            <p class="subtitle is-2">{{getWotkTimeAVG(result.you.minute)}}時間</p>
          </div>
          <div class="column is-half">
            <p class="subtitle is-4"><i class="fas fa-2x fa-users"></i> 全体</p>
            <p class="is-size-4">今月の平均残業時間</p>
            <p class="subtitle is-2">{{getWotkTime(result.group.minute)}}時間</p>
            <p class="is-size-4">今月の平均残業日数</p>
            <p class="subtitle is-2">{{parseInt(result.group.workdate!=null?result.group.workdate:0)}}日</p>
            <p class="is-size-4">1日の平均残業時間</p>
            <p class="subtitle is-2">{{getWotkTimeAVG(result.group.minute)}}時間</p>
          </div>
        </div>
      <Loading class="loading" v-else-if="showLoading"/>
    </transition>
  </section>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/loading/Loading'
import builders from '@/api/helper/builders'

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
  computed: {
    // 今月の日数を表示
    thisMonthLastDay () {
      const date = new Date()
      date.setMonth(date.getMonth() + 1)
      date.setDate(0)
      return date.getDate()
    }
  },
  methods: {
    getWotkTime (minute) {
      if (minute) {
        return (minute/60).toFixed(1)
      } else {
        return 0
      }
    },
    getWotkTimeAVG (minute) {
      if (minute) {
        return ((minute/60)/this.thisMonthLastDay).toFixed(2)
      } else {
        return 0
      }
    }
  },
  async mounted () {
    try {
      const response = await axios.get(builders.AnalysisBuilder.buildGetAnalysis(this.user_oid))
      this.result = response.data
    } catch (err) {
      this.$store.commit('childPage/setError', true)
      this.showLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.columns{
  padding-top: 30px;
}
.column{
  padding-bottom: 50px;
}
</style>
