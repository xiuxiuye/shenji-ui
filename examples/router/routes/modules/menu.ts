const route: Router.Route = {
  path: '/menu',
  name: 'menu',
  component: () => import('#/views/Menu/index.vue')
}

export default route
