<template>
  <section class="section">
    <transition name="fade-fase" mode="out-in">
      <div class="container" v-if="boards">
        <div class="wrap"><h1>お知らせ</h1></div>
        <div class="card-area">
          <div class="row columns" v-for="(rowBoards, index) in $_mixinUtil_splitArray(boards,3)" :key = index>
            <Card v-for="(board, innerIndex) in rowBoards"
              v-bind = "board"
              :key = "index * 3 + innerIndex"
              @open="targetModal = board"
            />
          </div>
        </div>
        <CardModal v-if="targetModal" v-bind = "targetModal" @close="targetModal = false">
          <p class="title is-4" slot="title">{{targetModal.title}}</p>
          <p class="subtitle" slot="subtitle">{{targetModal.subtitle}}</p>
          <p class="subtitle" slot="body">{{targetModal.content}}</p>
          <p class="subtitle has-text-centered created-info" slot="footer">
            {{`${targetModal.user}（${$_mixinUtil_parseDate_yyyy_MM_dd(targetModal.created_at)}）`}}
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
          <textarea v-model="createNoticeForm.content" class="textarea has-fixed-size" placeholder="本文" slot="body"></textarea>
          <button id="addButton" class="button is-fullwidth" slot="footer" @click="addNotice()">投稿</button>
        </CardModal>
      </div>
      <Loading v-else/>
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
      targetModal: false,
      showForm: false,
      createNoticeForm: {
        title: '',
        subtitle: '',
        content: '',
        user: sessionStorage.userDisplayName
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
      return this.createNoticeForm.title && this.createNoticeForm.subtitle && this.createNoticeForm.content
    }
  },
  methods: {
    addNotice () {
      if (!this.checkForm) {
        alert('未入力項目があります')
        return
      }
      axios.post('http://localhost:5000/team-tool-demo/us-central1/widgets/team-api/notices/add', this.createNoticeForm)
        .then(response => {
          alert('投稿しました')
          this.showForm = false
          this.boards = null;
          axios.get('http://localhost:5000/team-tool-demo/us-central1/widgets/team-api/notices')
            .then(response => {
              this.boards = response.data
            })
        })
        .catch((error) => {
          alert('投稿に失敗しました')
          console.log(error)
        })
    }
  },
  mounted () {
    axios.get('http://localhost:5000/team-tool-demo/us-central1/widgets/team-api/notices')
      .then(response => {
        this.boards = response.data
      })
  }
}
</script>

<style scoped lang="scss">
.wrap{
  text-align: center;
}
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
  transition: opacity 1.5s;
}
.fade-fast-enter, .fade-fast-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
