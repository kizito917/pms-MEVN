import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexTitle: 'Welcome To PMS',
    clientLoginTitle: 'Hi Registered Client, Kindly login your account',
    adminLoginTitle: 'Hi Registered Admin, Kindly login your account',
    gottenToken: '',
    userToken: ''
  },
  getters: {
    getAdminToken: state => {
      const fetchMe = localStorage.getItem('adminToken')
      state.gottenToken = fetchMe
      return state.gottenToken
    },
    getUserToken: state => {
      const fetch = localStorage.getItem('userToken')
      state.userToken = fetch
      return state.userToken
    }
  },
  mutations: {
    
  },
  actions: {
    // getAllInvoice({state, commit}) {
    //   console.log(state.indexTitle)
    //   state.test = 'greetings'
    //   commit('getAllInvoice')
    // }
  },
  modules: {
  }
})
