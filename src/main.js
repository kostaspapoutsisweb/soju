import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      access_token: '',
      spotifyData: [],
      // count: 0
    }
  },
  mutations: {
    access_token (state, data) {
      state.access_token = data
    },
    spotifyData (state, data) {
      state.spotifyData = data
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
