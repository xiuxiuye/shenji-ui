const route: Router.Route = {
  path: '/switch',
  name: 'switch',
  component: () => import('#/views/Switch/index.vue')
}

export default route
