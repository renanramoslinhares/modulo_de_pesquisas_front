<template>
  <div>
    <AlertComponent v-model="alert" />
    <PageComponent
      title="Dimensões"
      :navbar="{title: 'Tarefas', path: '/tarefas'}"
      :isLoading="isLoading"
      :isEmpty="!dimensionsList.length"
    >
      <template v-slot:action>
        <router-link to="/criar-dimensao" class="btn btn-primary">
          <font-awesome-icon size="lg" :icon="['fa', 'plus']"/>
          Criar Dimensão
        </router-link>
      </template>
      <template v-slot:list>
        <div v-for="(dimension, index) in dimensionsList" :key="index" class="list-group-item">
          <div class="row">
            <div class="col">{{ dimension.name  }}</div>
            <div class="col d-flex flex-row-reverse">   
              <button @click="removeId = dimension.id" class="rounded-circle btn btn-danger" title="Excluir">
                <font-awesome-icon size="lg" :icon="['fa', 'times']"/>
              </button>
              <router-link :to="`/editar-dimensao/${dimension.id}`" class="rounded-circle btn btn-primary mr-2" title="Editar">
                <font-awesome-icon size="lg" :icon="['fa', 'pencil-alt']"/>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </PageComponent>

    <CreateOrEditDimensionComponent
      v-if="isModal"
      @alert="(createAlert) => (alert = createAlert)"
    />
    <ConfirmComponent
      v-if="removeId"
      @remove="() => {remove(removeId)}"
      @close="() => {this.removeId = null}"
    >
      Você tem certeza que deseja remover a dimensão
      <b>"{{ dimensionNameEdit }}"</b>?
    </ConfirmComponent>
  </div>
</template>
<script>
import CreateOrEditDimensionComponent from "@/components/dimension/CreateOrEditDimensionComponent";
import ConfirmComponent from "@/components/utils/ConfirmComponent";
import AlertComponent from "@/components/utils/AlertComponent";
import PageComponent from "@/components/utils/PageComponent";

import { readAll, deleteById } from "@/services/apiService";

export default {
  name: "DimensionsView",
  props: { isModal: { type: Boolean, default: false } },
  components: {
    CreateOrEditDimensionComponent,
    ConfirmComponent,
    AlertComponent,
    PageComponent
  },
  data: () => ({
    isLoading: true,
    removeId: null,
    dimensionsList: [],
    alert: {},
  }),
  computed: {
    dimensionNameEdit() {
      return this.dimensionsList.find((el) => el.id == this.removeId).name;
    }
  },
  methods: {
    remove(id) {
      deleteById('dimension', id).then((resp) => {
        this.removeId = null;
        this.alert = {
          type: resp.isSuccess ? "primary" : "danger",
          text: resp.message,
        };
        if (resp.isSuccess) {
          this.dimensionsList = this.dimensionsList.filter(
            (el) => el.id !== id
          );
        }
      });
    },
  },
  created() {
    this.isLoading = true;
    readAll('dimension').then((resp) => {
      this.dimensionsList = resp;
      this.isLoading = false;
    });
  },
};
</script>
