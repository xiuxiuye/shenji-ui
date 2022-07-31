const route: Router.Route = {
  path: '/checkbox',
  name: 'checkbox',
  component: () => import('#/views/Checkbox/index.vue')
}

export default route
