import Vue from "vue";
import VueRouter from "vue-router";

import TasksView from "@/views/TasksView";
import DimensionsView from "@/views/DimensionsView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: TasksView,
  },
  {
    path: "/tarefas/",
    component: TasksView,
  },
  {
    path: "/criar-tarefa",
    component: TasksView,
    props: { isModal: true },
  },
  {
    path: "/editar-tarefa/:id",
    component: TasksView,
    props: { isModal: true },
  },
  {
    path: "/dimensoes",
    component: DimensionsView,
  },
  {
    path: "/criar-dimensao",
    component: DimensionsView,
    props: { isModal: true },
  },
  {
    path: "/editar-dimensao/:id",
    component: DimensionsView,
    props: { isModal: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
