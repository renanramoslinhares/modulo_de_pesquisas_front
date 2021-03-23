<template>
  <ModalComponent :title="idEdit ? 'Editar dimensão' : 'Criar dimensão'">
    <template v-slot:body>
      <p>
        <input
          type="text"
          placeholder="Nome da dimensão*"
          id="text"
          v-model="dimensionName"
          required
          class="form-control"
        />
      </p>
    </template>
    <template v-slot:footer>
      <p>
        <router-link to="/dimensoes" class="btn btn-outline-primary mr-2"
          >Cancelar</router-link
        >
        <button @click="idEdit ? update() : create()" class="btn btn-primary">
          Salvar
        </button>
      </p>
    </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/utils/ModalComponent";
import { create, readById, updateById } from "@/services/apiService";

export default {
  name: "CreateOrEditDimensionComponent",
  components: { ModalComponent },
  data: () => ({
    dimensionName: "",
  }),
  computed: {
    idEdit() {
      return this.$route.params.id;
    },
  },
  watch: {
    idEdit(id) {
      if (id) this.readById(id);
      else this.dimensionName = "";
    },
  },
  methods: {
    readById(id) {
      readById("dimension", id).then((dimension) => {
        this.dimensionName = dimension.name;
      });
    },
    create() {
      create("dimension", { name: this.dimensionName }).then((resp) => {
        this.$emit("alert", {
          text: resp.message,
          type: resp.isSuccess ? "primary" : "danger",
        });
        if (resp.isSuccess) window.location.pathname = "/dimensoes";
      });
    },
    update() {
      updateById("dimension", this.idEdit, { name: this.dimensionName }).then(
        (resp) => {
          this.$emit("alert", {
            text: resp.message,
            type: resp.isSuccess ? "primary" : "danger",
          });
          if (resp.isSuccess) window.location.pathname = "/dimensoes";
        }
      );
    },
  },
  created() {
    if (this.idEdit && this.idEdit !== "undefined") {
      this.readById(this.idEdit);
    }
  },
};
</script>
