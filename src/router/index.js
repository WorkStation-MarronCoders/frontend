import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '../Login/Presentation/the-login.page.vue'
import TheRegister from '../Login/Presentation/the-register.page.vue'
import RecoverAccount from '../Login/Presentation/recover-account.page.vue'
import ChangePassword from '../Login/Presentation/change-password.page.vue'
import TheDashboard from '../Dashboard/Presentation/the-dashboard.page.vue'
import ThePlans from '../Plans/Presentation/account-plans.page.vue'
import AddProperty from '../Properties/Presentation/add-property.page.vue'
import TheProfile from '../Profile/Presentation/the-profile.page.vue'
import SearchResults from '../Search/the-search.page.vue'

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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TheDashboard
    },
    {
      path: '/plans',
      name: 'plans',
      component: ThePlans
    },
    {
      path: '/property',
      name: 'property',
      component: AddProperty
    },
    {
      path: '/profile',
      name: 'profile',
      component: TheProfile
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResults
    }
  ]
})

export default router