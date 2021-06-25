import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import useLogin from 'src/modules/login'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  const {erro_login, user, token, isLogado, login, isLogged} = useLogin()

  Router.beforeEach((to, from, next) => {
     if (to.matched.some(record => record.meta.requiresAuth)) {
       // Se precisa de login verifica se está logado
       // se não estiver redireciona para o Login
       console.log(isLogged())
       if (!isLogged() ) {
         next({
           path: '/login',
           query: { redirect: to.fullPath }
         })
       } else {
         next()
       }
     } else {
       next() // make sure to always call next()!
     }
   })

  return Router
})
