import { IssueInterface } from 'components/project/models/issue.interface';

export interface ColumnInterface {
  readonly id: number;
  name: string;
  issues: IssueInterface[];
}
