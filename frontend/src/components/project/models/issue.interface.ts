import CommentInterface from 'components/project/models/comment.interface';

export default interface IssueInterface {
  readonly id: number;
  name: string;
  description?: string;
  environment?: string;
  attachments?: string;
  // dependentIssues:
  comments?: CommentInterface[];
}
