<template>
  <select id="select" class="custom-select" required v-model="selectedId">
    <option value="" disabled>Selecione uma dimensão*</option>
    <option
      v-for="dimension in dimensionsList"
      :key="dimension.id"
      :value="dimension.id"
      >{{ dimension.name }}</option
    >
  </select>
</template>
<script>
import { readAll } from "@/services/apiService";
export default {
  name: "SelectDimension",
  props: { value: String },
  data: () => ({
    selectedId: "",
    dimensionsList: [],
  }),
  watch: {
    selectedId(value) {
      this.$emit("input", value);
    },
    value(value) {
      this.selectedId = value;
    },
  },
  created() {
    readAll("dimension").then((resp) => {
      this.dimensionsList = resp;
    });
  },
};
</script>
