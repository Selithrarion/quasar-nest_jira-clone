import { ProjectModel } from 'src/models/project/project.model';
import { BoardModel } from 'src/models/project/board.model';

export interface ProjectStateInterface {
  projects?: ProjectModel[] | null;
  projectDetail?: ProjectModel | null;
  boardDetail?: BoardModel | null;
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
    projectDetail: null,
    boardDetail: null,
    availableIssueTypes: [
      {
        id: 1,
        name: 'Баг',
        key: 'BUG',
        icon: 'crop_square',
        color: 'red-5',
      },
      {
        id: 2,
        name: 'Задача',
        key: 'TASK',
        icon: 'change_history',
        color: 'blue-5',
      },
      {
        id: 3,
        name: 'История',
        key: 'HISTORY',
        icon: 'circle',
        color: 'green-5',
      },
      {
        id: 4,
        name: 'Исследование',
        key: 'INVESTIGATION',
        icon: 'help',
        color: 'amber-5',
      },
    ],
    availableIssuePriorities: [
      {
        id: 1,
        name: 'Очень низкий приоритет',
        key: 'LOWEST',
        icon: 'remove',
        color: 'green-5',
      },
      {
        id: 2,
        name: 'Низкий приоритет',
        key: 'LOW',
        icon: 'expand_more',
        color: 'green-7',
      },
      {
        id: 3,
        name: 'Средний приоритет',
        key: 'MEDIUM',
        icon: 'drag_handle',
        color: 'amber-5',
      },
      {
        id: 4,
        name: 'Высокий приоритет',
        key: 'HIGH',
        icon: 'expand_less',
        color: 'red-5',
      },
      {
        id: 5,
        name: 'Срочно',
        key: 'HIGHEST',
        icon: 'priority_high',
        color: 'red-7',
      },
    ],
  };
}

export default state;
