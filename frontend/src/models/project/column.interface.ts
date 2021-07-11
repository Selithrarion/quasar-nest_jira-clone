import { IssueInterface } from 'src/models/project/issue.interface';

export interface ColumnInterface {
  readonly id: number;
  name: string;
  issues: IssueInterface[];
}
