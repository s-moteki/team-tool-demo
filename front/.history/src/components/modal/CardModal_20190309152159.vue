<template>
  <transition name="modal">
    <div class="modal-background">
      <div class="card-modal">
        <div class="modal-container">
          <button class="button modal-close-button" @click="close">
            <i class="fa fa-2x fa-close "></i>
          </button>
          <div class="modal-header">
              <slot name="title">
              </slot>
              <slot name="subtitle">
              </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CardModal',
  data: {},
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-background {
  position: fixed;
  z-index: 1000;
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
  width: auto;
  min-width: 65%;
  overflow: scroll;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .6);
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
  color: #666;
  background: none;
  border: none;
}

.modal-enter,.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(2);
  transform: scale(2);
}
</style>
