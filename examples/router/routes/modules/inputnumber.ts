const route: Router.Route = {
  path: '/inputNumber',
  name: 'inputNumber',
  component: () => import('#/views/inputNumber/index.vue')
}

export default route
