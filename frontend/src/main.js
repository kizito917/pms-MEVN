import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import store from './store'
import {faCheck, faEdit, faTimes, faTrash, faCreditCard, faUpload} from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add([faCheck, faEdit, faTimes, faTrash, faCreditCard, faUpload])

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(axios);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('userToken')) {
      next({
        path: '/client/login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

//client side authentication for admin users
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('adminToken')) {
      next({
        path: '/admin/login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

//export the initialization of event bus for passing and recieving data
export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
