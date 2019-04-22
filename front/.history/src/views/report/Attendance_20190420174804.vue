<template>
  <div>
    <table class="table table is-striped table is-hoverable">
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
        <tr>
          <td>10/10</td>
          <td>早退</td>
          <td>18:00~19:00</td>
          <td>未</td>
        </tr>
        <tr>
          <td>10/13</td>
          <td>午後休</td>
          <td>12:00~18:00</td>
          <td>未</td>
        </tr>
      </tbody>
    </table>
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
