<template>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-image">
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
          </div>
          <div class="media-content">
            <p class="title is-4">{{title}}</p>
            <p class="subtitle is-6">{{subtitle}}</p>
          </div>
        </div>
        <div class="content">
          <p>{{content}}</p>
        </div>
        <time datetime="datetime">{{datetime = '2019-01-31 32:22:22'}}</time>
        <button class="modal-default-button" @click="$emit('open')">dsgsdf</button>
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

<style scoped>
.card-area{
    margin-top: 3rem;
}

p{
  word-break: break-all;
}

.content{
  max-height: 100px;
  overflow: hidden;
}

</style>
