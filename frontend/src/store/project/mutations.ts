import { MutationTree } from 'vuex';
import { ProjectStateInterface } from './state';
import { ProjectModel } from 'src/models/project/project.model';
import { BoardModel } from 'src/models/project/board.model';
import { IssueModel } from 'src/models/project/issue.model';
import { ColumnModel } from 'src/models/project/column.model';

const mutation: MutationTree<ProjectStateInterface> = {
  SET_PROJECTS(state, projects: ProjectModel[]) {
    state.projects = projects;
  },
  SET_PROJECT_DETAIL(state, project: ProjectModel) {
    state.projectDetail = project;
  },
  ADD_PROJECT(state: ProjectStateInterface, project: ProjectModel) {
    state.projects?.unshift(project);
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
    state.boardDetail = board;
  },
  ADD_BOARD(state: ProjectStateInterface, board: BoardModel) {
    if (!state.projectDetail) return;
    const projectBoards = state.projectDetail.boards;
    projectBoards.push(board);
  },
  UPDATE_BOARD(state: ProjectStateInterface, board: BoardModel) {
    if (!state.projectDetail) return;
    const projectBoards = state.projectDetail.boards;
    const boardIndex = projectBoards.findIndex((b) => b.id === board.id);
    projectBoards[boardIndex] = board;
  },
  DELETE_BOARD(state: ProjectStateInterface, boardID: number) {
    if (!state.projectDetail) return;
    const projectBoards = state.projectDetail.boards;
    const boardIndex = projectBoards.findIndex((b) => b.id === boardID);
    projectBoards.splice(boardIndex, 1);
  },
  TOGGLE_BOARD_FAVORITE(state: ProjectStateInterface, boardID: number) {
    const boardInProject = state.projectDetail?.boards.find((b) => b.id === boardID);
    if (boardInProject) boardInProject.favorite = !boardInProject.favorite;
  },

  // issue
  SET_ISSUE_DETAIL(state: ProjectStateInterface, issue: IssueModel) {
    state.issueDetail = issue;
  },
  ADD_ISSUE(state: ProjectStateInterface, issue: IssueModel) {
    if (!state.boardDetail) return;
    const columns = state.boardDetail.columns;
    const column = columns.find((c) => c.id === issue.columnID) || columns[0];
    column.issues.push(issue);
  },
  UPDATE_ISSUE(state: ProjectStateInterface, issue: IssueModel) {
    if (!state.boardDetail) return;
    const columns = state.boardDetail.columns;
    const column = columns.find((c) => c.id === issue.columnID);
    if (!column) return;
    const issueIndex = column.issues.findIndex((i) => i.id === issue.id);
    if (issueIndex) column.issues[issueIndex] = issue;
  },
  DELETE_ISSUE(state: ProjectStateInterface, issue: IssueModel) {
    if (!state.boardDetail) return;
    const columns = state.boardDetail.columns;
    const column = columns.find((c) => c.id === issue.columnID);
    if (!column) return;
    const issueIndex = column.issues.findIndex((i) => i.id === issue.id);
    if (issueIndex) column.issues.splice(issueIndex, 1);
  },
  SET_ISSUE_DRAGGING_STATUS(state: ProjectStateInterface, status: boolean) {
    state.isIssueDragging = status;
  },

  UPDATE_COLUMN(state: ProjectStateInterface, { id, payload }: { id: number; payload: ColumnModel }) {
    if (!state.boardDetail) return;
    const columns = state.boardDetail.columns;
    const columnIndex = columns.findIndex((c) => c.id === id);
    if (columnIndex !== -1)
      state.boardDetail.columns[columnIndex] = { ...state.boardDetail.columns[columnIndex], ...payload };
  },
};

export default mutation;
