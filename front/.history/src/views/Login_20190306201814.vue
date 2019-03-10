<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <p class="subtitle is-5 blinking">Touch</p>
            <a :href="authPath" class="avatar">
              <figure class="avatar">
                <img src="@/assets/img/signin-logo-lock.png">
              </figure>
            </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '@/components/commons/Header.vue'
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'Login',
  data () {
    return {
      authPath: ''
    }
  },
  components: {
    Header
  },
  mounted() {
    const token = MicrosoftApis.Auth.getAccessToken()
    if(token){
      this.$router.push('/home')
    }else{
      if(MicrosoftApis.Auth.validateTokenResponse(window.location.hash))
        this.$router.push('/home')
    }
    this.authPath = MicrosoftApis.Auth.buildAuthUrl()
  }
}
</script>

<style scoped lang="scss">
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.box {
  margin-top: 5rem;
  }

.avatar {
  padding-bottom: 40px;
  img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    height: 130px;
  }
}

p {
  font-weight: 800;
}
</style>
