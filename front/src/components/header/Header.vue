<template>
<section id="header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <img src="./../../assets/img/header-img-logo.png">
        <div class="navbar-burger burger" @click="toggleMenu">
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

  <!-- モバイル対応 -->
  <transition name="fade">
    <div v-if="mobileMenu" class="black-out" @click="toggleMenu"/>
  </transition>
  <transition name="slide">
    <div v-if="mobileMenu" class="mobileMenu">
      <h1 class="mobile-title">Menu</h1>
      <div class="navbar-start is-link" @click="toggleMenu">
        <router-link to="/home" class="navbar-item">
          Home
        </router-link>
        <router-link to="/report" class="navbar-item">
          Report
        </router-link>
      </div>
      <div class="navbar-end">
        <a class="navbar-item" @click="logOut()">
          Log out<i class="fa fa-sign-out-alt fa-2x"></i>
        </a>
      </div>
    </div>
  </transition>

</section>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      mobileMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.mobileMenu = !this.mobileMenu
      document.querySelector('.burger').classList.toggle('is-active')
    },
    logOut () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.black-out{
  background-color: #000;
  opacity: 0.9;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  position: absolute;
}
.mobileMenu{
  transition: all 0.6s ease;
  background-color: #2c3e50;
  right: 0;
  height: 100vh;
  width: 190px;
  z-index: 100;
  position: absolute;
  h1{
    font-weight: 300;
    text-align: center;
    display: block;
    color:  #42b983;
    border-bottom: solid 1px #f08080;
  }
  .navbar-start{
    a{
      font-size: 130%;
    }
  }
  .navbar-end{
    font-size: 130%;
    i{
      padding-left:10px;
      font-size: 180%;
      display: inline-block;
      vertical-align: middle;
    }
  }
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

.slide-leave-active {
  position: absolute;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
