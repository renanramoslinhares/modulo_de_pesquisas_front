<template>
  <ModalComponent :title="idEdit ? 'Editar tarefa' : 'Criar tarefa'">
    <template v-slot:body>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Texto da pergunta*" v-model="taskText" required>
      </div>
      <p>
        <SelectDimension v-model="selectedDimensionId" />
      </p>
    </template>

    <template v-slot:footer>
      <p>
        <router-link to="/tarefas" class="btn btn-outline-primary mr-2">Cancelar</router-link>
        <button @click="idEdit ? update() : create()" class="btn btn-primary">Salvar</button>
      </p>
    </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/utils/ModalComponent";
import SelectDimension from "@/components/form/SelectDimension";

import { create, readById, updateById } from "@/services/apiService";

export default {
  name: "CreateOrEditTaskComponent",
  components: { ModalComponent, SelectDimension },
  data: () => ({
    taskText: "",
    selectedDimensionId: "",
  }),
  computed: {
    idEdit() {
      return this.$route.params.id;
    },
  },
  watch: {
    idEdit(id) {
      if (id) {
        this.readById(id);
      } else {
        this.taskText = "";
      }
    },
  },
  methods: {
    readById(id) {
      readById("task", id).then((task) => {
        this.selectedDimensionId = task.dimensionId;
        this.taskText = task.text;
      });
    },
    create() {
      create("task", { text: this.taskText, dimensionId: this.selectedDimensionId })
      .then((resp) => {
        this.$emit("alert", { text: resp.message, type: resp.isSuccess ? "primary" : "danger" });
        if (resp.isSuccess) window.location.pathname = "/tarefas";
      });
    },

    update() {
      updateById("task", this.idEdit, { text: this.taskText, dimensionId: this.selectedDimensionId })
        .then((resp) => {
          this.$emit("alert", {
            text: resp.message,
            type: resp.isSuccess ? "primary" : "danger",
          });
          if (resp.isSuccess) window.location.pathname = "/tarefas";
        });
    },
  },
  created() {
    if (this.idEdit && this.idEdit !== "undefined") {
      this.readById(this.idEdit);
    }
  },
};
</script>
