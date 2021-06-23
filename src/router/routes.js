
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    requiresAuth:true,
    children: [
      { path: '',      component: () => import('pages/Index.vue'),
        meta : {
          requiresAuth: true
        } },
      { path: 'local', component: () => import('pages/IndexLocal.vue'),
        meta : {
          requiresAuth: true
        } },
      { path: 'novo',  component: () => import('pages/Novo.vue') ,
        meta : {
          requiresAuth: true
        } },
      { path: 'usuario/:id', component: () => import('pages/Usuario.vue'), name: 'editar',
        meta : {
          requiresAuth: true
        }
      },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue'), name: 'dashboard',
        meta : {
          requiresAuth: true
        }
      },

    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',      component: () => import('pages/Login.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
