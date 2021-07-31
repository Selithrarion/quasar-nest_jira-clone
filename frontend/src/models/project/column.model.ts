import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';
import { BoardModel } from 'src/models/project/board.model';

export interface ColumnModel extends BaseModel {
  name: string;
  board: BoardModel;
  issues: IssueModel[];
}

export interface ColumnDTO extends ColumnModel {}
