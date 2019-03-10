<template>
  <section class="section" v-if="boards">
    <div class="container">
<!--      <h1 class="title has-text-left is-2">{{ data = 'data'}}</h1>
      <h2 class="subtitle has-text-left is-3">
          {{ TitleData}}
      </h2> -->
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
import Card from '@/components/partial/Card.vue'
//import loadingView from '@/components/common/loadingView.vue'
//import axios from 'axios'
import CardModal from '@/components/partial/CardModal.vue'

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
      {title:'titletest1', subtitle:'subtitletest1',content: '＿＿＿＿＿＿＿＿gigrijgdsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgdfj;gj＿＿＿＿＿＿＿gkdfjglkjfdlk;gjk;fdjg;kljdfg;lkjdfgl;kdfjsg;lkfjdgl;kjfdgk;ljfdglfgdjfgdjgfdjkfgjkjgkfjkjkfkjjkjkjkgjkdfgjkgdfjkgfdj;＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿a＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿sjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlgsjgdkjgfkjgfdjkfgdjkfgkjgjkgdkjgdjkgjkgjkgjkgdjkgkfdggfdlg＿＿＿＿＿＿＿＿＿＿＿＿aa'},
      {title:'titletest2', subtitle:'subtitletest1',content: 'content1'},
      {title:'titletest3', subtitle:'subtitletest1',content: 'content1'},
      {title:'titletest4', subtitle:'subtitletest1',content: 'content1'},
      {title:'titletest5', subtitle:'subtitletest1',content: 'content1'}
    ]
  }
}
</script>

<style scoped>
.card-area{
    margin-top: 2rem;
}

.section{
  padding-top: 0px;
}

.container{
  overflow: scroll;
}
</style>
