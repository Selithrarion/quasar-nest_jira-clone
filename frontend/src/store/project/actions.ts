import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import projectService from 'src/service/projectService';
import boardService from 'src/service/boardService';
import issueService from 'src/service/issueService';
import columnService from 'src/service/columnService';

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
  async getBoardByID({ commit }, id) {
    const board = await boardService.getByID(id);
    commit('SET_BOARD_DETAIL', board);
  },
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
  async toggleBoardFavorite({ commit }, id) {
    commit('TOGGLE_BOARD_FAVORITE', id);
    await boardService.toggleFavorite(id);
  },

  // issue
  async getIssueByID({ commit }, issueID) {
    const issue = await issueService.getByID(issueID);
    commit('SET_ISSUE_DETAIL', issue);
  },
  async createIssue({ commit }, issueData) {
    const issue = await issueService.create(issueData);
    commit('ADD_ISSUE', issue);
    return issue;
  },
  async updateIssue({ commit }, { id, issueData }) {
    const issue = await issueService.update(id, issueData);
    commit('UPDATE_ISSUE', issue);
  },
  async deleteIssue({ commit }, issueID) {
    await issueService.delete(issueID);
    commit('DELETE_ISSUE', issueID);
  },

  async updateColumn({ commit }, { id, payload }) {
    const data = await columnService.update(id, payload);
    commit('UPDATE_COLUMN', data);
  },
};

export default actions;
