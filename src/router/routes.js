
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',      component: () => import('pages/Index.vue') },
      { path: 'local', component: () => import('pages/IndexLocal.vue') },     
      { path: 'novo',  component: () => import('pages/Novo.vue') },
      { path: 'usuario/:id', component: () => import('pages/Usuario.vue'), name: 'editar' },

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
