
export const routes = [
  {
    path: '/',
    // path: 'main',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    children: [
      {
        path: 'home',
        //path的别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },

      {
        path: 'sort',
        name: 'Sort',
        component: () => import('../views/Sort.vue'),
      },

      {
        path: 'listRank',
        name: 'ListRank',
        component: () => import('../views/ListRank.vue'),
      },

      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      }
    ]
  },

  {
    path: '/detail/:cid',
    name: 'Detail',
    props: true,
    component: () => import('../views/Detail.vue'),
  },

  {
    // path: '/',
    path: '/viewManga/:id',
    name: 'ViewManga',
    component: () => import('../views/ViewManga.vue'),
  },

  {
    // path: '/',
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },

  {
    // path: '/',
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  {
    // path: '/',
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
  },

  {
    // path: '/',
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/Collection.vue'),
  },

]