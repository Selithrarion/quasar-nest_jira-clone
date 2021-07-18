import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import projectService from 'src/service/projectService';
import boardService from 'src/service/boardService';

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

  async toggleFavorite({ commit }, id) {
    commit('TOGGLE_FAVORITE', id);
    await projectService.toggleFavorite(id);
  },

  // board
  async createBoard({ commit }, boardData) {
    const board = await boardService.create(boardData);
    commit('ADD_BOARD', board);
    return board;
  },
  async updateBoard({ commit }, { id, boardData }) {
    const board = await boardService.update(id, boardData);
    commit('UPDATE_BOARD', board);
  },
  async deleteBoard({ commit }, boardID) {
    await boardService.delete(boardID);
    commit('DELETE_BOARD', boardID);
  },
};

export default actions;
