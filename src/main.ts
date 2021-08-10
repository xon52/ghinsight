import { createApp } from 'vue'
import router from '@/router'
import PrimeVue from '@/primevue'
import App from '@/App.vue'

const app = createApp(App)
app.use(router)
PrimeVue(app)

app.mount('#app')
