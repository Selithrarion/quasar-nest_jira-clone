import { ProjectModel } from 'src/models/project/project.model';
import { BoardModel } from 'src/models/project/board.model';

export interface ProjectStateInterface {
  projects?: ProjectModel[] | null;
  projectDetail?: ProjectModel | null;
  boardDetail?: BoardModel | null;
}

function state(): ProjectStateInterface {
  return {
    projects: null,
    projectDetail: null,
    boardDetail: null,
  };
}

export default state;
