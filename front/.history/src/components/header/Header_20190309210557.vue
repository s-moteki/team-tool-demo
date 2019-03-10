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
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Help
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item">
              <i class="fa fa-sign-out-alt"></i>
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
