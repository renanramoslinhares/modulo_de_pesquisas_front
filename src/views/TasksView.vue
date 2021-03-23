<template>
  <div>
    <AlertComponent v-model="alert" />
    <PageComponent
      title="Tarefas"
      :navbar="{title: 'Dimensões', path: '/dimensoes'}"
      :isLoading="isLoading"
      :isEmpty="!tasksList.length"
    >
      <template v-slot:action>
        <router-link to="/criar-tarefa" class="btn btn-primary">
          <font-awesome-icon size="lg" :icon="['fa', 'plus']"/>
          Criar Tarefa
        </router-link>
      </template>
      <template v-slot:filter>
        <div class="list-group-item">
          <p>
            <SelectDimension v-model="selectedDimensionId" />
          </p>
        </div>
      </template>
      <template v-slot:list>
        <div v-for="(task, index) in filteredTasksList" :key="index" class="list-group-item">
          <div class="row">
            <div class="col-2">
              <button
                class="btn btn-ligth"
                v-if="task.status === 'active'"
                @click="changeTaskStatus(task, index)"
              >
                <font-awesome-icon size="lg" :icon="['fa', 'toggle-on']"/><br />
                <small>Ativo</small>
              </button>
              <button class="btn btn-ligth" v-else @click="changeTaskStatus(task, index)">
                <font-awesome-icon size="lg" :icon="['fa', 'toggle-off']"/><br />
                <small>Inativo</small>
              </button>
            </div>
            <div class="col-2">{{ task.dimensionName}}</div>
            <div class="col-5">{{ task.text }}</div>
            <div class="col-3 d-flex flex-row-reverse align-middle py-3">
              <button @click="removeId = task.id" class="rounded-circle btn btn-danger" title="Excluir" style="height: 40px; width: 40px">
                <font-awesome-icon size="lg" :icon="['fa', 'times']"/>
              </button>
              <router-link
                :to="`/editar-tarefa/${task.id}`"
                class="rounded-circle btn btn-primary mr-2 px-1"
                title="Editar"
                style="height: 40px; width: 40px"
              >
                <font-awesome-icon size="lg" :icon="['fa', 'pencil-alt']"/>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </PageComponent>
    <CreateOrEditTaskComponent
      v-if="isModal"
      @alert="(createAlert) => (alert = createAlert)"
    />
    <ConfirmComponent
      v-if="removeId"
      @remove="() => remove(removeId)"
      @close="() =>this.removeId = null"
    >
      Você tem certeza que deseja remover a tarefa <b>"{{ taskTextEdit }}"</b>?
    </ConfirmComponent>
  </div>
</template>
<script>
import CreateOrEditTaskComponent from "@/components/task/CreateOrEditTaskComponent";
import ConfirmComponent from "@/components/utils/ConfirmComponent";
import AlertComponent from "@/components/utils/AlertComponent";
import PageComponent from "@/components/utils/PageComponent";
import SelectDimension from "@/components/form/SelectDimension";
import { readAll, deleteById, updateById } from "@/services/apiService";

export default {
  name: "TasksView",
  props: { isModal: { type: Boolean, default: false } },
  components: {
    CreateOrEditTaskComponent,
    ConfirmComponent,
    AlertComponent,
    PageComponent,
    SelectDimension
  },
  data: () => ({
    isLoading: true,
    removeId: null,
    tasksList: [],
    alert: {},
    selectedDimensionId: '',
  }),
  computed: {
    taskTextEdit() {
      return this.tasksList.find((el) => el.id == this.removeId).text;
    },
    filteredTasksList() {
      return this.tasksList.filter(task => !this.selectedDimensionId || task.dimensionId === this.selectedDimensionId);
    }
  },
  methods: {
    changeTaskStatus(task, index) {
      const newStatus = task.status === 'active' ? 'inactive' : 'active';
      this.tasksList[index].status = newStatus;
      updateById("task", task.id, { status: newStatus })
        .then((resp) => {
          this.alert = {
            text: resp.message,
            type: resp.isSuccess ? "success" : "danger",
          };
        });
    },
    remove(id) {
      deleteById("task", id).then((resp) => {
        this.removeId = null;
        this.alert = {
          type: resp.isSuccess ? "primary" : "danger",
          text: resp.message,
        };
        if (resp.isSuccess) {
          this.tasksList = this.tasksList.filter((el) => el.id !== id);
        }
      });
    },
  },
  created() {
    this.isLoading = true;
    readAll("task").then((resp) => {
      this.tasksList = resp;
      this.isLoading = false;
    });
  },
};
</script>