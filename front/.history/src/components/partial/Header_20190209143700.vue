<template>
<section id="header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a href="#">
          <img src="./../../assets/img/header-img-logo.png">
        </a>
        <div class="navbar-burger burger" data-target="navbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu nav-right">
        <div class="navbar-start is-link">
          <a class="navbar-item" id="about">
            About
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

<style scoped>

.is-active {
  display: initial;
}
#about{
  color:#F06292;
}

img{
  padding-top: 3px;
  height:50px;
}
</style>
