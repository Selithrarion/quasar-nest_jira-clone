import { MutationTree } from 'vuex';
import { ProjectStateInterface } from './state';
import { ProjectModel } from 'src/models/project/project.model';

const mutation: MutationTree<ProjectStateInterface> = {
  SET_PROJECTS(state, projects: ProjectModel[]) {
    state.projects = projects;
  },
  SET_PROJECT_DETAIL(state, project: ProjectModel) {
    state.projectDetail = project;
  },
  ADD_PROJECT(state: ProjectStateInterface, project: ProjectModel) {
    state.projects?.push(project);
  },
  UPDATE_PROJECT(state: ProjectStateInterface, dashboard: ProjectModel) {
    if (!state.projects) return;
    const index = state.projects.findIndex((d) => d.id === dashboard.id);
    state.projects[index] = dashboard;
  },
  DELETE_PROJECT(state: ProjectStateInterface, id: number) {
    state.projects = state.projects?.filter((p) => p.id !== id);
  },
};

export default mutation;
