import { RouteRecordRaw } from 'vue-router';
import component from '*.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },

      { path: '/projects', name: 'projects', component: () => import('pages/project/Projects.vue') },
      {
        path: '/projects/:id',
        component: () => import('pages/project/ProjectDetail.vue'),
        children: [
          {
            path: 'board/:id',
            name: 'board',
            meta: {
              name: 'Доска задач'
            },
            component: () => import('components/project/board/ProjectBoard.vue'),
          },
          {
            path: 'roadmap',
            name: 'roadmap',
            meta: {
              name: 'Дорожная карта'
            },
            component: () => import('components/project/ProjectRoadmap.vue'),
          },
        ],
      },

      { path: 'filters', component: () => import('pages/Filters.vue') },

      {
        path: 'dashboards',
        component: () => import('pages/dashboard/Dashboard.vue'),
      },
      {
        path: 'dashboards/:id',
        component: () => import('pages/dashboard/DashboardDetail.vue'),
      },

      { path: 'people', component: () => import('pages/people/People.vue') },
      { path: 'people/team/:id', component: () => import('pages/people/PeopleTeam.vue') },
      // { path: 'apps', component: () => import('pages/Apps.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
