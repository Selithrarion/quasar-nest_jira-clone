import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';
import { ColumnDTO } from 'src/models/project/column.model';
import { IssueDTO } from 'src/models/project/issue.model';
import { BoardDTO } from 'src/models/project/board.model';
import { ProjectDTO } from 'src/models/project/project.model';

import projectRepository from 'src/repositories/projectRepository';
import boardRepository from 'src/repositories/boardRepository';
import issueRepository from 'src/repositories/issueRepository';
import columnRepository from 'src/repositories/columnRepository';
import { PaginationApiPayload } from 'src/models/common/pagination.model';

const actions: ActionTree<ProjectStateInterface, StateInterface> = {
  async getAll({ commit }, payload: PaginationApiPayload) {
    const projects = await projectRepository.getAll(payload);
    commit('SET_PROJECTS', projects);
  },
  async getByID({ commit }, id: number) {
    const project = await projectRepository.getByID(id);
    commit('SET_PROJECT_DETAIL', project);
  },
  async create({ commit }, payload: ProjectDTO) {
    const project = await projectRepository.create(payload);
    commit('ADD_PROJECT', project);
    return project;
  },
  async update({ commit }, { id, payload }: { id: number; payload: ProjectDTO }) {
    const project = await projectRepository.update(id, payload);
    commit('UPDATE_PROJECT', project);
  },
  async delete({ commit }, id: number) {
    await projectRepository.delete(id);
    commit('DELETE_PROJECT', id);
  },
  async toggleFavorite({ commit }, id: number) {
    commit('TOGGLE_FAVORITE', id);
    await projectRepository.toggleFavorite(id);
  },

  // board
  async getBoardByID({ commit }, id: number) {
    const board = await boardRepository.getByID(id);
    commit('SET_BOARD_DETAIL', board);
  },
  async createBoard({ commit }, payload: BoardDTO) {
    const board = await boardRepository.create(payload);
    commit('ADD_BOARD', board);
    return board;
  },
  async updateBoard({ commit }, { id, payload }: { id: number; payload: BoardDTO }) {
    const board = await boardRepository.update(id, payload);
    commit('UPDATE_BOARD', board);
  },
  async deleteBoard({ commit }, id: number) {
    await boardRepository.delete(id);
    commit('DELETE_BOARD', id);
  },
  async toggleBoardFavorite({ commit }, id: number) {
    commit('TOGGLE_BOARD_FAVORITE', id);
    await boardRepository.toggleFavorite(id);
  },

  // issue
  async getIssueByID({ commit }, id: number) {
    const issue = await issueRepository.getByID(id);
    commit('SET_ISSUE_DETAIL', issue);
  },
  async createIssue({ commit }, payload: IssueDTO) {
    const issue = await issueRepository.create(payload);
    commit('ADD_ISSUE', issue);
    return issue;
  },
  async updateIssue(
    { commit },
    { id, columnID, payload }: { id: number; columnID: number; payload: Partial<IssueDTO> }
  ) {
    commit('UPDATE_ISSUE', { id, columnID, payload });
    await issueRepository.update(id, payload);
  },
  async deleteIssue({ commit }, id: number) {
    await issueRepository.delete(id);
    commit('DELETE_ISSUE', id);
  },
  async addIssueComment({ commit }, { id, text }: { id: number; text: string }) {
    const comment = await issueRepository.addComment(id, text);
    commit('ADD_ISSUE_COMMENT', comment);
  },
  async editIssueComment({ commit }, { commentID, text }: { commentID: number; text: string }) {
    const comment = await issueRepository.editComment(commentID, text);
    commit('UPDATE_ISSUE_COMMENT', comment);
  },
  async deleteIssueComment({ commit }, commentID: number) {
    await issueRepository.deleteComment(commentID);
    commit('DELETE_ISSUE_COMMENT', commentID);
  },

  async updateColumn({ commit }, { id, payload }: { id: number; payload: ColumnDTO }) {
    commit('UPDATE_COLUMN', { id, payload });
    await columnRepository.update(id, payload);
  },
};

export default actions;
