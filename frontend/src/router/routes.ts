import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '/auth',
        component: () => import('pages/Auth.vue'),
        meta: { guest: true },
      },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue'), meta: { auth: true } },

      {
        path: '/projects',
        name: 'projects',
        component: () => import('pages/project/Projects.vue'),
        meta: { auth: true },
      },
      {
        path: '/projects/:projectID',
        component: () => import('pages/project/ProjectDetail.vue'),
        meta: { auth: true },
        children: [
          {
            path: 'board/:boardID',
            name: 'board',
            meta: {
              name: 'Доска задач',
            },
            component: () => import('components/project/board/ProjectBoard.vue'),
          },
          {
            path: 'roadmap',
            name: 'roadmap',
            meta: {
              name: 'Дорожная карта',
            },
            component: () => import('components/project/roadmap/ProjectRoadmap.vue'),
          },
        ],
      },

      { path: 'filters', component: () => import('pages/Filters.vue'), meta: { auth: true } },

      {
        path: 'dashboards',
        component: () => import('pages/dashboard/Dashboard.vue'),
        meta: { auth: true },
      },
      {
        path: 'dashboards/:id',
        component: () => import('pages/dashboard/DashboardDetail.vue'),
        meta: { auth: true },
      },

      { path: 'people', component: () => import('pages/people/People.vue'), meta: { auth: true } },
      { path: 'people/team/:id', component: () => import('pages/people/PeopleTeam.vue'), meta: { auth: true } },
      // { path: 'apps', component: () => import('pages/Apps.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
