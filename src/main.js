import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import Toast from "vue-toastification"
Vue.component('paginate', Paginate);

Vue.config.productionTip = false;

Vue.use(Toast);

import "vue-toastification/dist/index.css";
import "./assets/styles/index.scss";
import "./index.css";

new Vue({
  render: h => h(App),
}).$mount('#app')
