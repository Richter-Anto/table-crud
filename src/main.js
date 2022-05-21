import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router/router.js"
import toastify from "vue-toastify"

Vue.use(toastify, { my: "settings", position: "top-right" });

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
