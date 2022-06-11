const route: Router.Route = {
  path: '/avatar',
  name: 'avatar',
  component: () => import('#/views/Avatar/index.vue')
}

export default route
