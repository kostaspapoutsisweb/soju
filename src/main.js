import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      copyYear: '2021',
      access_token: '',
      spotifyData: [],
      spotifyMethod: 'api',
      // count: 0
    }
  },
  mutations: {
    copyYear (state, data) {
      state.copyYear = data
    },
    access_token (state, data) {
      state.access_token = data
    },
    spotifyData (state, data) {
      state.spotifyData = data
    },
    spotifyMethod (state, data) {
      state.spotifyMethod = data
    }
    // increment (state) {
    //   state.count++
    // }
  }
})

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(store)
app.mount('#app')
