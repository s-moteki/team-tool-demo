<template>
<section id="header">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
        <div class="navbar-burger burger" data-target="navbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbar" class="navbar-menu">
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

nav{
  margin-bottom: -2px;
}
.is-active {
  display: initial;
}
#about{
  color:#F06292;
  border-bottom: solid 1px #F06292;
}

</style>
