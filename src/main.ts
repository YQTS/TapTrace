import { createApp } from 'vue'
import "./style.css"
import 'animate.css'
import App from './App.vue'
import './samples/node-api'
import { setupRouter } from './router'

const setupAll = () => {
  const app = createApp(App)


  setupRouter(app)

  app.mount('#app').$nextTick(() => postMessage({payload: 'removeLoading'}, '*'))

}

setupAll()

// createApp(App)
//   .mount('#app')
//   .$nextTick(() => {
//     postMessage({ payload: 'removeLoading' }, '*')
//   })
