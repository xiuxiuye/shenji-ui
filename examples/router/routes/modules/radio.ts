const route: Router.Route = {
  path: '/radio',
  name: 'radio',
  component: () => import('#/views/Radio/index.vue')
}

export default route
