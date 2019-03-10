<template>
  <transition name="modal">
    <div class="modal-background">
      <div class="card-modal">
        <div class="modal-container">
          <button class="button modal-close-button" @click="close">
            <i class="fa fa-close "></i>
          </button>
          <div class="modal-header">
              <p class="title">{{title}}</p>
              <p class="subtitle">{{subtitle}}</p>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p class="subtitle">{{content}}</p>
            </slot>
          </div>
          <div class="modal-footer">
              {{date = '2018-01-22'}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CardModal',
  props: ['title', 'subtitle', 'content'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .3s ease;
  max-height: 100%;
}

.card-modal {
  padding-top: 20px;
  padding-bottom: 20px;
  max-height: 100%;
  min-width: 100%;
  overflow: scroll;
  display: table-cell;
  vertical-align: middle;
}

.card-modal p{
  color: #546E7A;
}

.modal-container {
  position: relative;
  max-width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .3);
  transition: all .3s ease;
}

.modal-body {
  margin: 20px 0;
  word-break: normal;
}

.modal-close-button {
  position: absolute;
  top: 0;
  right: 0;
}

.modal-enter,.modal-leave-active {
  opacity: 0;
}


.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(3);
  transform: scale(3);
}</style>
