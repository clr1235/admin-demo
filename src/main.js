import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)



router.beforeEach(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start()
})
router.afterEach(() => {
    NProgress.done()
})

app.use(createPinia())
app.use(router)

app.mount('#app')
