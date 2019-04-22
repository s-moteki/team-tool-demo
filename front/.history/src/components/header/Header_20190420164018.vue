<template>
<section id="header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <img src="./../../assets/img/header-img-logo.png">
        <div class="navbar-burger burger" data-target="navTarget">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navTarget">
        <div class="navbar-start is-link">
          <router-link to="/home" class="navbar-item">
            Home
          </router-link>
          <router-link to="/report" class="navbar-item">
            Report
          </router-link>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" @click="logOut()">
            <i class="fa fa-sign-out-alt fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
</section>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logOut () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted () {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector(`#${burger.dataset.target}`)
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    })
  }
}
</script>

<style scoped lang="scss">
.is-active {
  display: initial;
}

i{
  color: #42b983;
}

.navbar-item{
  color: #FFF;
  &:hover{
    color: #666;
  }
}

img{
  padding-left:5px;
  padding-top: 3px;
  height:50px;
}

.navbar{
  padding-top:3px;
  padding-bottom:5px;
  background-color: #2c3e50;
  span{
    color: #f5f5f5
  }
}
</style>
