import { BaseModel } from 'src/models/common/base.model';
import { ColumnModel } from 'src/models/project/column.model';
import { ProjectModel } from 'src/models/project/project.model';

export interface BoardModel extends BaseModel {
  name: string;
  favorite: boolean;
  columns: ColumnModel[];
  projectID: number;
}

export interface BoardDTO {
  name: string;
  columns: ColumnModel[];
  project: ProjectModel;
}
