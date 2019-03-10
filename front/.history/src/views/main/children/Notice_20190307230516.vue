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
      </CardModal>
      <button class="button add icon">
        <i class ="fa fa-2x fa-fw fa-plus"/>
      </button>
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
//import axios from 'axios'
import CardModal from '@/components/modal/CardModal.vue'

export default {
  name: 'Notice',
  data () {
    return {
      TitleData: 'Notice',
      boards: null,
      targetModal: false
    }
  },
  components: {
    Card,
    CardModal
  },
  mounted () {
/*    axios.get('http://localhost:5001/test-front-adf12/us-central1/widgets/api-test/')
      .then(response => {
        this.boards = response.data
      })*/
    this.boards = [
      {title:'おしらせ', subtitle:'移行について',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミー'},
      {title:'新年会のおしらせ', subtitle:'12/10開催予定',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ'},
      {title:'titletest3', subtitle:'subtitletest1',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を'},
      {title:'新入社員', subtitle:'◯◯◯さんの挨拶',content: 'はじめまして、◯◯◯です。この度は・・・・・・・です。よろしくお願いします'},
      {title:'titletest5', subtitle:'subtitletest1',content: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーで'}
    ]
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  color: #FFF;
  background-color: #42b983;
}
</style>
