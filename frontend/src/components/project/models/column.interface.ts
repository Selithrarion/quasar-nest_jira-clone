import IssueInterface from "components/project/models/issue.interface";

export default interface ColumnInterface {
  readonly id: number;
  name: string;
  issues: IssueInterface[]
}
