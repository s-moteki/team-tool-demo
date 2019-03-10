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
          <a class="navbar-item" id="about">
            About
          </a>
          <a class="navbar-item" id="about">
            Help
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
  mounted () {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('#'+ burger.dataset.target);
    burger.addEventListener('click', function() {
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

.navbar-item{
  color: $color-base-link;
}

img{
  padding-top: 3px;
  height:55px;
}

.navbar{
  padding-top:3px;
  padding-bottom:5px;
  color:gainsboro;
  background-color: #F5F5F5;
}
</style>
