import { MutationTree } from 'vuex';
import { ProjectStateInterface } from './state';
import { ProjectInterface } from 'src/models/project/project.interface';

const mutation: MutationTree<ProjectStateInterface> = {
  SET_PROJECTS(state, projects: ProjectInterface[]) {
    state.projects = projects;
  },
  SET_PROJECT_DETAIL(state, project: ProjectInterface) {
    state.projectDetail = project;
  },
};

export default mutation;
