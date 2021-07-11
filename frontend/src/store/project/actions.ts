import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import projectService from 'src/service/projectService';

const actions: ActionTree<ProjectStateInterface, StateInterface> = {
  async fetchProjects({ commit }) {
    const projects = await projectService.getAll();
    commit('SET_PROJECTS', projects);
  },
  async fetchProjectDetailByID({ commit }, id) {
    const project = await projectService.getByID(id);
    commit('SET_PROJECT_DETAIL', project);
  },
};

export default actions;
