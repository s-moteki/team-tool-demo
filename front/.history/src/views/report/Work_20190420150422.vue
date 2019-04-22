<template>
  <div class="hero">
    <button class="button is-success" @click="sendMail">テスト</button>
  </div>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'work',
  methods: {
    sendMail () {
        // 予定一覧api
        await MicrosoftApis.Mail.sendMail()
        alert('sendMail')
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
