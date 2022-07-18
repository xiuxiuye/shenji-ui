const route: Router.Route = {
  path: '/input',
  name: 'input',
  component: () => import('#/views/Input/index.vue')
}

export default route
