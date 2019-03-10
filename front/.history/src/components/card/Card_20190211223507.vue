<template>
  <div class="column is-one-third">
    <div class="card" @click="$emit('open')">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{title}}</p>
            <p class="subtitle is-6">{{subtitle}}</p>
          </div>
        </div>
        <div class="content">
          <p>{{content}}</p>
        </div>
        <div class="createInfo">
          {{userName = 'テスト太郎'}}（{{datetime = '2019-01-31'}}）
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  dara () {
    return {
      showModal: false
    }
  },
  props: ['title', 'subtitle', 'content'],
  components: {
  }
}
</script>

<style scoped style lang="scss">
.card{
  border-radius: 3px;
  border: 1px solid #f5fffa;
  p{
    color: #666;
  }
  :hover{
    background-color: #f5fffa;
  }
}

.content{
  max-height: 100px;
  min-height: 100px;
  overflow: hidden;
  p{
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}

.createInfo{
  color: #666;
  text-align: right;
}
</style>
