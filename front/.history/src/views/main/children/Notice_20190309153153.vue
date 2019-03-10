<template>
  <section class="section" v-if="boards">
    <div class="container">
      <div class="wrap"><h1>お知らせ</h1></div>
      <div class="card-area">
        <div class="row columns" v-for="rowNum in parseInt((boards.length+2)/3)" :key = rowNum>
          <Card v-for="index in 3"
            v-if = "(rowNum -1) * 3 + index - 1 < boards.length"
            v-bind = "boards[ (rowNum -1) * 3 + index - 1]"
            :key = "(rowNum -1) * 3 + index - 1"
            @open="targetModal = boards[ (rowNum -1) * 3 + index - 1]"
          />
        </div>
      </div>
      <CardModal v-if="targetModal" v-bind = "targetModal" @close="targetModal = false">
        <p class="title is-4" slot="title">{{targetModal.title}}</p>
        <p class="subtitle" slot="subtitle">{{targetModal.subtitle}}</p>
        <p class="subtitle" slot="body">{{targetModal.content}}</p>
        <p class="subtitle has-text-centered" slot="footer">
          {{`${targetModal.user}（${parseDate(targetModal.create_at)}）`}}
        </p>
      </CardModal>

      <button class="button add icon" @click="showForm = true">
        <i class ="fa fa-2x fa-fw fa-plus"/>
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
  </section>
</template>
<script>

/**
 * /**
 * file-signature
 * list.reduce((table, item) => {
	const last = table[table.length - 1];
	if (last.length === 3) {
		table.push([item]);
		return table;
	}
	last.push(item);
	return table;
}, [[]]);
 */

import Card from '@/components/card/Card.vue'
import axios from 'axios'
import CardModal from '@/components/modal/CardModal.vue'

export default {
  name: 'Notice',
  data () {
    return {
      boards: null,
      targetModal: false,
      showForm: false,
      createNoticeForm: {
        title: '',
        subtitle: '',
        content: ''
      }
    }
  },
  components: {
    Card,
    CardModal
  },
  methods: {
    addNotice: () => {
      alert(this.$data.createNoticeForm.title)
    },
    parseDate: str => {
      const date = new Date(str)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  },
  mounted () {
      axios.get('http://localhost:5000/team-tool-demo/us-central1/widgets/team-api/notices')
      .then(response => {
        this.boards = response.data
      })
   /* this.boards = [
      {title:'おしらせ', subtitle:'移行について',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミー'},
      {title:'新年会のおしらせ', subtitle:'12/10開催予定',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ'},
      {title:'titletest3', subtitle:'subtitletest1',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を'},
      {title:'新入社員', subtitle:'◯◯◯さんの挨拶',content: 'はじめまして、◯◯◯です。この度は・・・・・・・です。よろしくお願いします'},
      {title:'titletest5', subtitle:'subtitletest1',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーで'}
    ]*/
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

</style>
