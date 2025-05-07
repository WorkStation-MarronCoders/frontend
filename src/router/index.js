import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '../Login/Presentation/the-login.page.vue'
import TheRegister from '../Login/Presentation/the-register.page.vue'
import RecoverAccount from '../Login/Presentation/recover-account.page.vue'
import ChangePassword from '../Login/Presentation/change-password.page.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: TheLogin
    },
    {
      path: '/register',
      name: 'register',
      component: TheRegister
    },
    {
      path: '/recover-account',
      name: 'recover-account',
      component: RecoverAccount
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router