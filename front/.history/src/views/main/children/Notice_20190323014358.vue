<template>
  <section class="section">
    <transition name="fade-fast" mode="out-in">
      <div class="container" v-if="notices">
        <div class="card-area">
          <div class="row columns" v-for="(rowNotices, index) in $_mixinUtil_splitArray(notices,3)" :key = index>
            <Card v-for="(notice, innerIndex) in rowNotices"
              v-bind = "notice"
              :key = "index * 3 + innerIndex"
              @open="targetModal = notice"
            />
          </div>
        </div>

        <CardModal v-if="targetModal" v-bind = "targetModal" @close="targetModal = false">
          <p class="title is-4" slot="title">{{targetModal.title}}</p>
          <p class="subtitle" slot="subtitle">{{targetModal.subtitle}}</p>
          <p class="subtitle" slot="body">{{targetModal.text}}</p>
          <p class="subtitle has-text-centered created-info" slot="footer">
            {{`${targetModal.user.display_name}（${$_mixinUtil_parseDate_yyyy_MM_dd(targetModal.created_at)}）`}}
          </p>
        </CardModal>

        <button class="button add icon" @click="showForm = true">
          <i class ="fa fa-2x fa-fw fa-pen"/>
        </button>

        <CardModal v-if="showForm" @close="showForm = false">
          <div class="input-title" slot="title">
            <p class="title has-text-centered">投稿内容の入力</p>
            <input v-model="createNoticeForm.title" class="input" type="text" placeholder="タイトル">
          </div>
          <input v-model="createNoticeForm.subtitle" class="input" type="text" placeholder="サブタイトル" slot="subtitle">
          <textarea v-model="createNoticeForm.text" class="textarea has-fixed-size" placeholder="本文" slot="body"></textarea>
          <button id="addButton" class="button is-fullwidth" slot="footer" @click="addNotice()">投稿</button>
        </CardModal>

      </div>
      <Loading v-else-if="showLoading"/>
    </transition>
  </section>
</template>
<script>

import Card from '@/components/card/Card.vue'
import axios from 'axios'
import CardModal from '@/components/modal/CardModal.vue'
import mixinUtil from '@/mixin/mixinUtil'
import Loading from '@/components/loading/Loading.vue'

export default {
  name: 'Notice',
  mixins: [mixinUtil],
  data () {
    return {
      boards: null,
      showLoading: true,
      targetModal: false,
      showForm: false,
      notices: null,
      createNoticeForm: {
        title: '',
        subtitle: '',
        text: '',
        user_oid: sessionStorage.userOid,
        display_name: sessionStorage.userDisplayName
      }
    }
  },
  components: {
    Card,
    CardModal,
    Loading
  },
  computed: {
    checkForm () {
      return this.createNoticeForm.title && this.createNoticeForm.subtitle && this.createNoticeForm.text
    }
  },
  methods: {
    addNotice () {
      if (!this.checkForm) {
        alert('未入力項目があります')
        return
      }
      axios.post('http://localhost:8888/api/notices', this.createNoticeForm)
        .then(response => {
          this.showForm = false
          this.notices = null
          this.showLoading = true
          axios.get('http://localhost:8888/api/notices')
            .then(response => {
              this.notices = response.data.data
              this.showLoading = true
            })
        })
        .catch((error) => {
          alert('投稿に失敗しました')
          console.log(error)
        })
    }
  },
  mounted () {
    axios.get('http://localhost:8888/api/notices')
    .then(response => {
      this.notices = response.data.data
    }).catch(err => {
        this.$store.commit('childPage/setError', true)
        this.showLoading = false
    })
  }
}
</script>

<style scoped lang="scss">

.container{
  .card-area{
    margin-top: 2rem;
  }
}

.add{
  border-radius: 50%;
  border-width: 2px;
  border: none;
  font-size: 0.9em;
  height: 50px;
  width: 50px;
  position: fixed;
  bottom: 40px;
  right: 10px;
  z-index: 100;
  color: #FFF;
  background-color: #42b983;
}

.textarea{
  width: 80vw;
}

.created-info{
  width: 80vw;
}

.fade-fast-enter-active, .fade-fast-leave-active {
  transition: opacity .5s;
}
.fade-fast-enter, .fade-fast-leave-to {
  opacity: 0;
}

</style>
