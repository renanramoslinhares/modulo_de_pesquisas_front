import Vue from 'vue'
import App from './App.vue'

// Router
import router from './router'

// Bootstrap
import { BootstrapVue } from  'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use (BootstrapVue)

// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faArrowLeft, faTimes, faPlus, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPencilAlt, faArrowLeft, faTimes, faPlus, faToggleOn, faToggleOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
