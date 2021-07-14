import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import projectService from 'src/service/projectService';

const actions: ActionTree<ProjectStateInterface, StateInterface> = {
  async getAll({ commit }) {
    const projects = await projectService.getAll();
    commit('SET_PROJECTS', projects);
  },
  async getByID({ commit }, id) {
    const project = await projectService.getByID(id);
    commit('SET_PROJECT_DETAIL', project);
  },
  async create({ commit }, projectData) {
    const project = await projectService.create(projectData);
    commit('ADD_PROJECT', project);
    return project;
  },
  async update({ commit }, { id, projectData }) {
    const project = await projectService.update(id, projectData);
    commit('UPDATE_PROJECT', project);
  },
  async delete({ commit }, id) {
    await projectService.delete(id);
    commit('DELETE_PROJECT', id);
  },
};

export default actions;
