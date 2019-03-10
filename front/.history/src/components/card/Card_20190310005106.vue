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
            {{created_info}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import mixinUtil from '@/mixin/mixinUtil'

export default {
  name: 'Card',
  mixins: [mixinUtil],
  dara () {
    return {
      showModal: false
    }
  },
  props: ['title', 'subtitle', 'content', 'user', 'created_at'],
  computed: {
    created_info () {
      return `${this.user}（${$_mixinUtil_parseDate_yyyy_MM_dd(this.created_at)}）`
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
    word-wrap: break-all;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}

.createInfo{
  text-align: right;
}
</style>
