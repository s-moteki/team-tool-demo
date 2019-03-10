<template>
  <transition name="modal">
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
  </transition>
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
  computed: {
    text(){
      return this.content.replace(/\r?\n/g, '<br>');
    }
  }
}
</script>

<style scoped style lang="scss">
.card{
  border-radius: 5px;
  border: 1.2px solid #2c3e50;
  p{
    color: #2c3e50;
  }
}

.content{
  max-height: 100px;
  min-height: 100px;
  overflow: hidden;
  p{
    word-wrap: break-word;
    white-space: pre-wrap
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}

.createInfo{
  text-align: right;
}
</style>
