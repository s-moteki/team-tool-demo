<template>
  <section class="hero is-fullheight">
    <Header/>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey"></h3>
          <p class="subtitle">次の情報を入力して下さい</p>
          <div class="box">
            <figure class="avatar">
              <img src="@/assets/img/signin-logo-lock.png">
            </figure>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" placeholder="メールアドレス" autofocus="" v-model="emailAddress">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="パスワード" v-model="password">
                </div>
              </div>
              <button class="button is-block is-large is-fullwidth" @click="signIn">サインイン</button>
          </div>
          <p>
            メールアドレス・パスワードを忘れた場合
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import Header from '@/components/commons/Header.vue'

export default {
  name: 'Login',
  data: function () {
    return {
      emailAddress: '',
      password: ''
    }
  },
  components: {
    Header
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.emailAddress, this.password).then(
        user => {
          this.$router.push('/')
        },
        () => {
          //err取得して情報をどこかに格納したい....
          alert('認証に失敗しました。')
        }
      )
    }
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
  margin-top: -70px;
  padding-bottom: 20px;
  img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    height: 120px;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
}

p {
  font-weight: 800;
}

input {
  font-weight: 300;
}

button{
  background: 1C1C1C;
  color: aliceblue;
}

.hero{
  background: #CCCCCC;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
}
</style>
