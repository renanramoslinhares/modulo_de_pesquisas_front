<template>
  <div>
    <nav v-if="navbar.title" class="navbar navbar-light bg-white" style="border-bottom: solid #000 3px">
        <router-link :to="navbar.path" class="navbar-brand">
            <font-awesome-icon size="lg" :icon="['fa', 'arrow-left']"/> 
            <b class="ml-2" style="line-height:32px">{{ navbar.title }}</b>
        </router-link>
    </nav>
    <div class="row mt-3">
      <div class="col">
        <h1>{{title}}</h1>
      </div>
      <div class="col d-flex flex-row-reverse">
        <div id="nav">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col list-group mt-5 px-3">
        <div v-if="isLoading" class="list-group-item">
          <div class="text-center">
            <div class="spinner-border" role="status" style="width: 100px; height: 100px;">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        </div>
        <div
          v-else-if="!isLoading && isEmpty"
          class="list-group-item"
        >
          Não há tarefas cadastradas.
        </div>
        <div v-else>
            <slot name="filter"></slot>
            <slot name="list"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "PageComponent",
    props: {title: String, isLoading: Boolean, isEmpty: Boolean, navbar: Object}
}
</script>