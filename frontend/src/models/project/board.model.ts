import { BaseModel } from 'src/models/common/base.model';
import { ColumnModel } from 'src/models/project/column.model';

export interface BoardModel extends BaseModel {
  name: string;
  favorite: boolean,
  columns: ColumnModel[];
  projectID: number;
}
