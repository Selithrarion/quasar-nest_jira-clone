import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProjectStateInterface } from './state';

const getters: GetterTree<ProjectStateInterface, StateInterface> = {
  getIssuePriorityName: (state) => (priority: string | number) => {
    return state.availableIssuePriorities.find((p) => p.key === priority || p.id === priority)?.name;
  },
  getIssueTypeName: (state) => (type: string | number) => {
    return state.availableIssueTypes.find((t) => t.key === type || t.id === type)?.name;
  },
};

export default getters;
