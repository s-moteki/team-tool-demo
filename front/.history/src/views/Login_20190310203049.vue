<template>
  <section class="hero is-fullheight">
    <a class="git-link" href="https://github.com/s-moteki/team-tool-demo">
      まずはここから<i class="fab fa-github git-icon fa-4x"></i>
    </a>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <p class="subtitle is-5 blinking">Please Tap</p>
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
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

export default {
  name: 'Login',
  data () {
    return {
      authPath: ''
    }
  },
  mounted () {
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      this.$router.push('/home')
    } else {
      if (MicrosoftApis.Auth.validateTokenResponse(window.location.hash)) {
        this.$router.push('/home')
      }
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

.git-link{
  color: #2c3e50;
  position:fixed;
  top:15px;
  right:20px;
}
</style>
