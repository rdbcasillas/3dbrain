import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vuetify from 'vuetify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'


Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(vuetify)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
