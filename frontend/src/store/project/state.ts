import { ProjectInterface } from 'src/models/project/project.interface';

export interface ProjectStateInterface {
  projects: ProjectInterface[] | null;
  projectDetail: ProjectInterface | null;
}

function state(): ProjectStateInterface {
  return {
    projects: null,
    projectDetail: null,
  };
}

export default state;
