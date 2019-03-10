<template>
<section id="header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
          <img src="./../../assets/img/header-img-logo.png">
        <div class="navbar-burger burger" data-target="navbar-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start is-link">
          <a class="navbar-item">
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
  height:60px;
}
</style>
