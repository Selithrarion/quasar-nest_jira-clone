import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PeopleStateInterface } from 'src/store/people/state';
import userService from 'src/service/userService';
import { UserDTO } from 'src/models/user/user.model';
import { TeamDTO } from 'src/models/user/team.model';
import teamService from 'src/service/teamService';

const actions: ActionTree<PeopleStateInterface, StateInterface> = {
  async getUserByID({ commit }, id: number) {
    const user = await userService.getByID(id);
    commit('SET_USER_DETAIL', user);
  },
  async getTeamByID({ commit }, id: number) {
    const team = await teamService.getByID(id);
    commit('SET_TEAM_DETAIL', team);
  },

  async updateUser({ commit }, { id, payload }: { id: number; payload: UserDTO }) {
    commit('UPDATE_USER_DETAIL', payload);
   await userService.update(id, payload);
  },
  async updateTeam({ commit }, { id, payload }: { id: number; payload: TeamDTO }) {
    commit('UPDATE_TEAM_DETAIL', payload);
   await teamService.update(id, payload);
  },
};

export default actions;
