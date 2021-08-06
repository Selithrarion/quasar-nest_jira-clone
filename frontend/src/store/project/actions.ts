import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import projectService from 'src/service/projectService';
import boardService from 'src/service/boardService';
import issueService from 'src/service/issueService';
import columnService from 'src/service/columnService';
import { ColumnDTO } from 'src/models/project/column.model';

const actions: ActionTree<ProjectStateInterface, StateInterface> = {
  async getAll({ commit }) {
    const projects = await projectService.getAll();
    commit('SET_PROJECTS', projects);
  },
  async getByID({ commit }, id) {
    const project = await projectService.getByID(id);
    commit('SET_PROJECT_DETAIL', project);
  },
  async create({ commit }, payload) {
    const project = await projectService.create(payload);
    commit('ADD_PROJECT', project);
    return project;
  },
  async update({ commit }, { id, payload }) {
    const project = await projectService.update(id, payload);
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
  async getBoardByID({ commit }, id) {
    const board = await boardService.getByID(id);
    commit('SET_BOARD_DETAIL', board);
  },
  async createBoard({ commit }, payload) {
    const board = await boardService.create(payload);
    commit('ADD_BOARD', board);
    return board;
  },
  async updateBoard({ commit }, { id, payload }) {
    const board = await boardService.update(id, payload);
    commit('UPDATE_BOARD', board);
  },
  async deleteBoard({ commit }, id) {
    await boardService.delete(id);
    commit('DELETE_BOARD', id);
  },
  async toggleBoardFavorite({ commit }, id) {
    commit('TOGGLE_BOARD_FAVORITE', id);
    await boardService.toggleFavorite(id);
  },

  // issue
  async getIssueByID({ commit }, id) {
    const issue = await issueService.getByID(id);
    commit('SET_ISSUE_DETAIL', issue);
  },
  async createIssue({ commit }, payload) {
    const issue = await issueService.create(payload);
    commit('ADD_ISSUE', issue);
    return issue;
  },
  async updateIssue({ commit }, { id, payload }) {
    const issue = await issueService.update(id, payload);
    commit('UPDATE_ISSUE', issue);
  },
  async deleteIssue({ commit }, id) {
    await issueService.delete(id);
    commit('DELETE_ISSUE', id);
  },

  async updateColumn({ commit }, { id, payload }: { id: number; payload: ColumnDTO }) {
    commit('UPDATE_COLUMN', { id, payload });
    await columnService.update(id, payload);
  },
};

export default actions;
