<template>
  <ModalComponent title="Remover">
    <template v-slot:body>
      <slot></slot>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-outline-primary" @click="$emit('close')">
        Cancelar
      </button>
      <button type="button" class="btn btn-danger" @click="$emit('remove')">
        Confirmar
      </button>
    </template>
  </ModalComponent>
</template>
<script>
import ModalComponent from "@/components/utils/ModalComponent";

export default {
  name: "ConfirmComponent",
  components: { ModalComponent },
};
</script>
