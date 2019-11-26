import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import clientRegister from '../components/client/Register.vue'
import clientLogin from '../components/client/Login.vue'
import clientDashboard from '../components/client/Dashboard.vue'
import clientAppointment from '../components/client/Appointment.vue'
import clientInvoice from '../components/client/myInvoice.vue'
import myAppointments from '../components/client/ViewAppointment.vue'
import uploadDocs from '../components/client/uploadDocument.vue'
import myDocuments from '../components/client/myDocument.vue'
import myProfile from '../components/client/myProfile.vue'
import adminRegister from '../components/admin/adminRegister.vue'
import adminLogin from '../components/admin/adminLogin.vue'
import adminDashboard from '../components/admin/adminDashboard.vue'
import viewClients from '../components/admin/viewClients.vue'
import viewClientsAppointment from '../components/admin/viewClientsAppointment.vue'
import createClientsInvoice from '../components/admin/createClientsInvoice.vue'
import viewClientsDocuments from '../components/admin/viewClientsDocument.vue'
import viewInvoice from '../components/admin/viewInvoice.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/client/register',
    name: 'clientRegister',
    component: clientRegister
  },
  {
    path: '/client/login',
    name: 'clientLogin',
    component: clientLogin
  },
  {
    path: '/client/dashboard',
    name: 'clientDashboard',
    component: clientDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/appointment',
    name: 'clientAppointment',
    component: clientAppointment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/myAppointment',
    name: 'myAppointments',
    component: myAppointments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/myInvoice',
    name: 'clientInvoice',
    component: clientInvoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/myProfile',
    name: 'myProfile',
    component: myProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/uploadDocuments',
    name: 'uploadDocument',
    component: uploadDocs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/myDocuments',
    name: 'myDocuments',
    component: myDocuments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/register',
    name: 'adminRegister',
    component: adminRegister
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: adminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'adminDashboard',
    component: adminDashboard,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/viewClients',
    name: 'viewClients',
    component: viewClients,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/viewClientsAppointment',
    name: 'viewClientsAppointment',
    component: viewClientsAppointment,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/createClientsInvoice',
    name: 'createClientsInvoice',
    component: createClientsInvoice,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/viewInvoice',
    name: 'viewInvoice',
    component: viewInvoice,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/viewDocuments',
    name: 'viewClientsDocuments',
    component: viewClientsDocuments,
    meta: {
      requiresAdminAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
