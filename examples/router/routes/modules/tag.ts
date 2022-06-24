const route: Router.Route = {
  path: '/tag',
  name: 'tag',
  component: () => import('#/views/Tag/index.vue')
}

export default route
