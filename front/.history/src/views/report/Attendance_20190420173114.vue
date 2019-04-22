<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>日付</th>
          <th>区分</th>
          <th>対象時間</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10/9</td>
          <td>残業</td>
          <td>18:00~19:00</td>
          <td>未</td>
        </tr>
      </tbody>
    </table>
    <p>日付:2018/10/9 報告区分:1 18:00~19:00 備考</p>
    <button class="button is-success" @click="sendMail">テスト</button>
  </div>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'Attendance',
  data () {
    return {

    }
  },
  methods: {
    async sendMail () {
        // 予定一覧api
        const result = await MicrosoftApis.Mail.sendMail()
        alert(result.res)
    }
  }
}
</script>

<style scoped lang="scss">
p{
  padding-top: 30vh;
  text-align: center;
}
</style>
