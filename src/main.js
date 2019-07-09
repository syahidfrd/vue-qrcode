import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import JsonExcel from 'vue-json-excel'

Vue.config.productionTip = false

Vue.component('downloadExcel', JsonExcel)

new Vue({
  render: h => h(App),
}).$mount('#app')
