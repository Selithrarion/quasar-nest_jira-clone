import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PeopleStateInterface } from 'src/store/people/state';
import userService from 'src/service/userService';
import { UserDTO } from 'src/models/user/user.model';
import { TeamDTO } from 'src/models/user/team.model';

const actions: ActionTree<PeopleStateInterface, StateInterface> = {
  async getUserByID({ commit }, id: number) {
    const user = await userService.getByID(id);
    commit('SET_USER_DETAIL', user);
  },
  async getTeamByID({ commit }, id: number) {
    const team = await userService.getTeamByID(id);
    commit('SET_TEAM_DETAIL', team);
  },

  async updateUser({ commit }, { id, payload }: { id: number; payload: UserDTO }) {
    const user = await userService.updateUser(id, payload);
    commit('SET_USER_DETAIL', user);
  },
  async updateTeam({ commit }, { id, payload }: { id: number; payload: TeamDTO }) {
    const team = await userService.updateTeam(id, payload);
    commit('SET_TEAM_DETAIL', team);
  },
};

export default actions;
