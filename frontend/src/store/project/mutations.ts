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
};

export default mutation;
