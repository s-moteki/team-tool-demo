<template>
  <div class="hero">
    <button class="button is-success" @click="sendMail">テスト</button>
  </div>
</template>

<script>
export default {
  name: 'work',
  methods: {
    sendMail () {
      alert('sendMail');
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
