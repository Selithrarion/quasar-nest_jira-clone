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
      { path: '/', name: 'work', component: () => import('pages/Index.vue'), meta: { auth: true } },

      {
        path: '/projects',
        name: 'projects',
        component: () => import('pages/project/Projects.vue'),
        meta: { auth: true },
      },
      {
        path: '/projects/:projectID',
        name: 'projectDetail',
        component: () => import('pages/project/ProjectDetail.vue'),
        meta: { auth: true },
        children: [
          {
            path: 'board',
            name: 'board',
            meta: {
              name: 'Board',
            },
            component: () => import('components/project/board/ProjectBoard.vue'),
            children: [
              {
                path: ':boardID',
                name: 'boardDetail',
                meta: {
                  name: 'Board',
                },
                component: () => import('components/project/board/ProjectBoard.vue'),
              },
            ],
          },
          {
            path: 'roadmap',
            name: 'roadmap',
            meta: {
              name: 'Roadmap',
            },
            component: () => import('components/project/roadmap/ProjectRoadmap.vue'),
          },
          {
            path: 'issues',
            name: 'issues',
            meta: {
              name: 'All project issues',
            },
            component: () => import('components/project/issues/ProjectIssues.vue'),
          },
          {
            path: 'issues/:issueID',
            name: 'issueDetail',
            meta: {
              name: 'Issue detail',
            },
            component: () => import('components/project/issues/ProjectIssueDetail.vue'),
          },
        ],
      },

      { path: 'filters', name: 'filters', component: () => import('pages/Filters.vue'), meta: { auth: true } },

      {
        path: 'dashboards',
        name: 'dashboards',
        component: () => import('pages/dashboard/Dashboard.vue'),
        meta: { auth: true },
      },
      {
        path: 'dashboards/:id',
        name: 'dashboardsDetail',
        component: () => import('pages/dashboard/DashboardDetail.vue'),
        meta: { auth: true },
      },

      { path: 'people', name: 'people', component: () => import('pages/people/People.vue'), meta: { auth: true } },
      {
        path: 'people/:userID',
        name: 'userProfile',
        component: () => import('pages/people/PeopleDetail.vue'),
        meta: { auth: true },
      },
      {
        path: 'people/team/:teamID',
        name: 'peopleTeam',
        component: () => import('pages/people/PeopleDetail.vue'),
        meta: { auth: true },
      },

      // { path: 'apps', name: 'apps', component: () => import('pages/Apps.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
