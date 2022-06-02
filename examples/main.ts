import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import shenji from '../dist/es/index.js'
// import '../dist/es/style.css'
import shenji from '../src'

createApp(App).use(router).use(shenji).mount('#app')
