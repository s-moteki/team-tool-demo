<template>
  <div>
    <p>日付:2018/10/9</p>
    <p>報告区分:1</p>
    <p>18:00~19:00</p>
    <p>備考</p>

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
