const route: Router.Route = {
  path: '/message',
  name: 'message',
  component: () => import('#/views/Message/index.vue')
}

export default route
