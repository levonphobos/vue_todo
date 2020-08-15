<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="$emit('close')">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <slot name="body">
                  default header
                </slot>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
                <button type="button" class="btn btn-primary" @click="$emit('saveModal')">Save changes</button>
              </div>
            </div>
          </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "modal",

  mounted() {

  }
}
</script>
