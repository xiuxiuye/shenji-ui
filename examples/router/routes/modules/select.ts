const route: Router.Route = {
  path: '/select',
  name: 'select',
  component: () => import('#/views/Select/index.vue')
}

export default route
