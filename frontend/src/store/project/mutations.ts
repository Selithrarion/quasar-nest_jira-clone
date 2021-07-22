import { MutationTree } from 'vuex';
import { ProjectStateInterface } from './state';
import { ProjectModel } from 'src/models/project/project.model';
import { BoardModel } from 'src/models/project/board.model';

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
  UPDATE_PROJECT(state: ProjectStateInterface, project: ProjectModel) {
    if (!state.projects) return;
    const index = state.projects.findIndex((d) => d.id === project.id);
    state.projects[index] = project;
  },
  DELETE_PROJECT(state: ProjectStateInterface, id: number) {
    if (!state.projects) return;
    const index = state.projects.findIndex((p) => p.id === id);
    state.projects.splice(index, 1);
  },

  TOGGLE_FAVORITE(state: ProjectStateInterface, id: number) {
    const project = state.projects?.find((p) => p.id === id);
    if (project) project.favorite = !project.favorite;
  },

  // board
  SET_BOARD_DETAIL(state: ProjectStateInterface, board: BoardModel) {
    state.boardDetail = board
  },
  ADD_BOARD(state: ProjectStateInterface, board: BoardModel) {
    const projectBoards = state.projectDetail?.boards;
    if (projectBoards) projectBoards.push(board);
  },
  UPDATE_BOARD(state: ProjectStateInterface, board: BoardModel) {
    const projectBoards = state.projectDetail?.boards;
    if (!projectBoards) return;
    const index = projectBoards.findIndex((b) => b.id === board.id);
    projectBoards[index] = board;
  },
  DELETE_BOARD(state: ProjectStateInterface, boardID) {
    const projectBoards = state.projectDetail?.boards;
    if (!projectBoards) return;
    const index = projectBoards.findIndex((b) => b.id === boardID);
    projectBoards.splice(index, 1);
  },
};

export default mutation;
