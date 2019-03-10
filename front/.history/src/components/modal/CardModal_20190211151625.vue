<template>
  <transition name="modal">
    <div class="modal-background">
      <div class="card-modal">
        <div class="modal-container">
          <div class="modal-header">
              <h1 class="title">{{title}}</h1>
          </div>
          <div class="modal-body">
            <slot name="body">
              {{content}}
            </slot>
          </div>
          <div class="modal-footer">
              {{date = '2018-01-22'}}
              <button class="modal-default-button" @click="close">
                CLOSE
              </button>
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
  overflow: scroll;
  display: table-cell;
  vertical-align: middle;
  color: #546E7A;
}

.modal-container {
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  word-break: break-all;
  color:
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}</style>
