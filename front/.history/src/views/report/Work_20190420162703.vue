<template>
  <div class="hero">
    <button class="button is-success" @click="sendMail">テスト</button>
  </div>
</template>

<script>
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'work',
  data () {
    return {

    }
  }
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
