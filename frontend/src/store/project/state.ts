import { ProjectModel } from 'src/models/project/project.model';

export interface ProjectStateInterface {
  projects?: ProjectModel[] | null;
  projectDetail?: ProjectModel | null;
}

function state(): ProjectStateInterface {
  return {
    projects: null,
    projectDetail: null,
  };
}

export default state;
