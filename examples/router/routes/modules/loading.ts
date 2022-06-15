const route: Router.Route = {
  path: '/loading',
  name: 'loading',
  component: () => import('#/views/Loading/index.vue')
}

export default route
