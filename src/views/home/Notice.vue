<template>
  <section class="section">
    <transition name="fade-fast" mode="out-in">
      <div class="container" v-if="notices">

        <!-- お知らせ一覧グリッド -->
        <div class="card-area">
          <div class="row columns" v-for="(rowNotices, index) in $_mixinUtil_splitArray(notices,3)" :key = index>
            <Card v-for="(notice, innerIndex) in rowNotices"
              v-bind = "notice"
              :key = "index * 3 + innerIndex"
              @open="targetModal = notice"
              @delete="setDeleteSign"
              @update="setUpdateForm"
            />
          </div>
        </div>

        <!-- お知らせタップ時モーダル -->
        <CardModal v-if="targetModal" v-bind = "targetModal" @close="targetModal = false">
          <p class="title is-4" slot="title">{{targetModal.title}}</p>
          <p class="subtitle" slot="subtitle">{{targetModal.subtitle}}</p>
          <p class="subtitle" slot="body">{{targetModal.text}}</p>
          <p class="subtitle has-text-centered created-info" slot="footer">
            {{`${targetModal.user.display_name}（${$_mixinUtil_parseDate_yyyy_MM_dd(targetModal.created_at)}）`}}
          </p>
        </CardModal>

        <!-- 投稿ボタン -->
        <button class="button add icon" @click="showForm = true">
          <i class ="fa fa-2x fa-fw fa-pen"/>
        </button>

        <!-- 投稿フォーム -->
        <CardModal v-if="showForm" @close="closeForm()">
          <div class="input-title" slot="title">
            <p class="title has-text-centered">投稿内容の入力</p>
            <input v-model="createNoticeForm.title" class="input" type="text" placeholder="タイトル">
          </div>
          <input v-model="createNoticeForm.subtitle" class="input" type="text" placeholder="サブタイトル" slot="subtitle">
          <textarea v-model="createNoticeForm.text" class="textarea has-fixed-size" placeholder="本文" slot="body"></textarea>
          <button id="addButton" class="button is-fullwidth" slot="footer" @click="addNotice()">投稿</button>
        </CardModal>

        <!-- 削除モーダル -->
        <CardModal v-if="deleteSign" @close="setDeleteSign(null)">
          <div class="input-title" slot="body">
            <p>投稿を削除しますか?</p>
          </div>
          <div slot="footer" class="buttons is-centered">
            <button class="button is-success" @click="deleteNotice(deleteSign)">はい</button>
            <button class="button is-danger" @click="setDeleteSign(null)">いいえ</button>
          </div>
        </CardModal>

        <!-- 更新フォーム -->
        <CardModal v-if="updateNoticeForm" @close="setUpdateForm(null)">
          <div class="input-title" slot="title">
            <p class="title has-text-centered">更新内容の入力</p>
            <input v-model="updateNoticeForm.title" class="input" type="text" placeholder="タイトル">
          </div>
          <input v-model="updateNoticeForm.subtitle" class="input" type="text" placeholder="サブタイトル" slot="subtitle">
          <textarea v-model="updateNoticeForm.text" class="textarea has-fixed-size" placeholder="本文" slot="body"></textarea>
          <button id="addButton" class="button is-fullwidth" slot="footer" @click="updateNotice()">修正する</button>
        </CardModal>

      </div>
      <Loading v-else-if="showLoading"/>
    </transition>
  </section>
</template>
<script>

import Card from '@/components/card/Card'
import axios from 'axios'
import CardModal from '@/components/modal/CardModal'
import mixinUtil from '@/mixin/mixinUtil'
import Loading from '@/components/loading/Loading'
import builders from '@/api/helper/builders'

export default {
  name: 'Notice',
  mixins: [mixinUtil],
  data () {
    return {
      showLoading: true,
      targetModal: false,
      showForm: false,
      notices: null,
      createNoticeForm: {
        title: '',
        subtitle: '',
        text: '',
        user_oid: sessionStorage.userOid,
        display_name: sessionStorage.userDisplayName,
        email: sessionStorage.userEmail
      },
      deleteSign: null,
      updateNoticeForm: null
    }
  },
  components: {
    Card,
    CardModal,
    Loading
  },
  computed: {
    // フォーム未入力チェック
    checkForm () {
      return this.createNoticeForm.title && this.createNoticeForm.subtitle && this.createNoticeForm.text
    },
    checkUpdateForm () {
      return this.updateNoticeForm.subtitle && this.updateNoticeForm.title && this.updateNoticeForm.text
    }
  },
  methods: {
    // 投稿ボタン押下時
    async addNotice () {
      if (!this.checkForm) {
        alert('未入力項目があります')
        return
      }
      try {
        const response = await axios.post(builders.NoticeBuilder.buildPostNotice(), this.createNoticeForm)
        alert('投稿が完了しました')
        this.resetDisplay(response.data)
        this.closeForm()
      } catch (error) {
        alert('投稿に失敗しました')
        console.log(error)
      }
    },
    // 入力フォーム初期化
    closeForm () {
      this.showForm = false
      this.createNoticeForm.title = ''
      this.createNoticeForm.subtitle = ''
      this.createNoticeForm.text = ''
    },
    // おしらせ削除
    async deleteNotice (id) {
      try {
        const response = await axios.delete(builders.NoticeBuilder.buildDeleteNotice(id))
        alert('削除が完了しました')
        this.resetDisplay(response.data)
        this.setDeleteSign()
      } catch (error) {
        alert('削除に失敗しました')
        console.log(error)
      }
    },
    // お知らせ情報更新
    async updateNotice () {
      // 未入力チェック
      if (!this.checkUpdateForm) {
        alert('未入力項目があります')
        return
      }
      try {
        const response = await axios.put(builders.NoticeBuilder.buildPutNotice(this.updateNoticeForm.id), this.updateNoticeForm)
        alert('更新が完了しました')
        this.resetDisplay(response.data)
        this.setUpdateForm(null)
      } catch(error) {
        alert('更新に失敗しました')
        console.log(error)
      }
    },
    // ローディング画面状態リセット
    resetDisplay (data) {
      this.showLoading = true
      this.notices = data
      this.showLoading = false
    },
    // 投稿削除モーダル　表示・非表示
    setDeleteSign (id) {
      this.deleteSign = id
    },
    // 更新モーダル　表示・非表示
    setUpdateForm (notice) {
      this.updateNoticeForm = notice
    }
  },
  async mounted () {
    // お知らせ一覧api
    try {
      const response = await axios.get(builders.NoticeBuilder.buildGetNotice())
      this.notices = response.data
    } catch (err) {
      this.$store.commit('childPage/setError', true)
      this.showLoading = false
    }
  }
}
</script>

<style scoped lang="scss">

.container{
  .card-area{
    margin-top: 2rem;
  }
}

.buttons{
  button{
    width: 45%;
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
  z-index: 98;
  color: #FFF;
  background-color: #42b983;
}

.textarea{
  width: 80vw;
}

.created-info{
  width: 80vw;
}
</style>
