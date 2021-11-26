import { ProjectModel } from 'src/models/project/project.model';
import { BoardModel } from 'src/models/project/board.model';
import { IssueModel } from 'src/models/project/issue.model';
import { PaginationMeta } from 'src/models/common/pagination.model';

import { vueI18n } from 'boot/vue-i18n';
const { t } = vueI18n.global;

export interface ProjectStateInterface {
  projects?: ProjectModel[] | null;
  projectsMeta?: PaginationMeta | null;

  projectDetail: ProjectModel | null;
  boardDetail: BoardModel | null;
  issueDetail: IssueModel | null;

  isIssueDragging: boolean;

  availableIssueTypes: IssuePropertyItem[];
  availableIssuePriorities: IssuePropertyItem[];
}
interface IssuePropertyItem {
  id: number;
  name: string;
  key: string;
  icon: string;
  color: string;
}

function state(): ProjectStateInterface {
  return {
    projects: null,
    projectsMeta: null,

    projectDetail: null,
    boardDetail: null,
    issueDetail: null,

    isIssueDragging: false,

    availableIssueTypes: [
      {
        id: 1,
        name: t('project.issueType.bug'),
        key: 'BUG',
        icon: 'crop_square',
        color: 'red-5',
      },
      {
        id: 2,
        name: t('project.issueType.task'),
        key: 'TASK',
        icon: 'change_history',
        color: 'blue-5',
      },
      {
        id: 3,
        name: t('project.issueType.history'),
        key: 'HISTORY',
        icon: 'circle',
        color: 'green-5',
      },
      {
        id: 4,
        name: t('project.issueType.investigation'),
        key: 'INVESTIGATION',
        icon: 'help',
        color: 'amber-5',
      },
    ],
    availableIssuePriorities: [
      {
        id: 1,
        name: t('project.issuePriority.lowest'),
        key: 'LOWEST',
        icon: 'remove',
        color: 'green-5',
      },
      {
        id: 2,
        name: t('project.issuePriority.low'),
        key: 'LOW',
        icon: 'expand_more',
        color: 'green-7',
      },
      {
        id: 3,
        name: t('project.issuePriority.medium'),
        key: 'MEDIUM',
        icon: 'drag_handle',
        color: 'amber-5',
      },
      {
        id: 4,
        name: t('project.issuePriority.high'),
        key: 'HIGH',
        icon: 'expand_less',
        color: 'red-5',
      },
      {
        id: 5,
        name: t('project.issuePriority.urgent'),
        key: 'HIGHEST',
        icon: 'priority_high',
        color: 'red-7',
      },
    ],
  };
}

export default state;
