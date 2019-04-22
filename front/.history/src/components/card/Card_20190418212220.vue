<template>
  <transition name="modal">
    <div class="column is-one-third">
      <div class="card">
        <div class="card-content" @click="$emit('open')">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{title}}</p>
              <p class="subtitle is-6">{{subtitle}}</p>
            </div>
          </div>
          <div class="content">
            <p>{{text}}</p>
          </div>
        </div>
        <div class="createInfo">
          {{`${user.display_name}（${$_mixinUtil_parseDate_yyyy_MM_dd(created_at)}）`}}
          <i v-if="isOwn" class="fas fa-trash-alt" @click="$emit('delete','str')"></i>
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
  props: ['title', 'subtitle', 'text', 'user', 'created_at'],
  computed: {
    // 投稿者と閲覧者が同一
    isOwn () {
      return this.user.user_oid == sessionStorage.userOid
    }
  },
  mounted() {
    if (this.isOwn) {
      this.user.display_name = 'あなた'
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
  padding-right: 15px;
  padding-bottom: 5px;
  i{
    color: red;
  }
}
</style>
