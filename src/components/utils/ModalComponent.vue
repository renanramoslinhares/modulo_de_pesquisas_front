<template>
  <div>
    <div class="modal fade show" tabindex="1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <p><slot name="body"></slot></p>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: { title: { type: String, default: "Atenção!" } },
};
</script>
