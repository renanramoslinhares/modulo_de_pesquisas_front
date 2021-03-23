<template>
  <div class="row mt-3 full-bottom-alert" v-if="Object.entries(value).length">
    <div class="col-12">
      <div
        role="alert"
        :class="`alert ${value.type !== 'danger'
          ? 'alert-success'
          : 'alert-danger'
        }`"
      >
        {{ value.text }}
        <button
          @click="$emit('input', {})"
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true" >
            <font-awesome-icon :icon="['fa', 'times']" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertComponent",
  props: { value: Object },
  methods: {
    timeout() {
      setTimeout(() => {
        this.$emit("input", {});
      }, 4000);
    },
  },
  watch: {
    value(value) {
      if (Object.entries(value).length) this.timeout();
    },
  },
  created() {
    this.timeout();
  },
};
</script>
<style scoped>
.full-bottom-alert {
  bottom: 15px;
  right: 15px;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 1500;
}
</style>
