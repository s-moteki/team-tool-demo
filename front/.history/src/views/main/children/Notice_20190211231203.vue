<template>
  <section class="section" v-if="boards">
    <div class="container">
      <div class="card-area">
        <div class="row columns" v-for="rowNum in parseInt((boards.length+2)/3)" :key = rowNum>
          <Card v-for="index in 3"
            v-if = "(rowNum -1) * 3 + index - 1 < boards.length"
            v-bind = "boards[ (rowNum -1) * 3 + index - 1]"
            :key = "(rowNum -1) * 3 + index - 1"
            @open="targetModal = boards[ (rowNum -1) * 3 + index - 1]"
                ></Card>
        </div>
      </div>
      <transition name="modal">
        <CardModal v-if="targetModal" v-bind = "targetModal" @close="targetModal = false"></CardModal>
      </transition>
  </div>

  </section>
</template>
<script>
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
      {title:'おしらせ', subtitle:'移行について',content: '＿＿＿＿＿＿＿＿gigrijgdsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgdfj;gj＿＿＿＿＿＿＿gkdfjglkjfdlk;gjk;fdjg;kljdfg;lkjdfgl;kdfjsg;lkfjdgl;kjfdgk;ljfdglfgdjfgdjgfdjkfgjkjgkfjkjkfkjjkjkjkgjkdfgjkgdfjkgfdj;＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿a＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿sjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlg＿＿＿＿＿＿＿＿＿＿＿＿aa'},
      {title:'新年会のおしらせ', subtitle:'12/10開催予定',content: 'content1'},
      {title:'titletest3', subtitle:'subtitletest1',content: 'content1'},
      {title:'新入社員', subtitle:'◯◯◯さんの挨拶',content: 'はじめまして、◯◯◯です。<br>この度は・・・・・・・です。よろしくお願いします'},
      {title:'titletest5', subtitle:'subtitletest1',content: 'content1'}
    ]
  }
}
</script>

<style scoped lang="scss">
.card-area{
    margin-top: 2rem;
}

.section{
  padding-top: 0px;
}
</style>
