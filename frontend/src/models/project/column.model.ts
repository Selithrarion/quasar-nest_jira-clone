import { IssueModel } from 'src/models/project/issue.model';

export interface ColumnModel {
  readonly id: number;
  name: string;
  issues: IssueModel[];
}
