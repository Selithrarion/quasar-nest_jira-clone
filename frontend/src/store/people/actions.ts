import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PeopleStateInterface } from 'src/store/people/state';
import { UserDTO } from 'src/models/user/user.model';
import { TeamDTO } from 'src/models/user/team.model';
import userService from 'src/service/userService';
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

  async uploadUserImage({ commit }, { file, type }: { file: File; type: 'avatar' | 'header' }) {
    if (type === 'avatar') {
      const avatar = await userService.uploadAvatar(file);
      commit('UPLOAD_USER_IMAGE', { avatar });
      commit('user/UPDATE_USER', { avatar }, { root: true });
    } else {
      const header = await userService.uploadHeader(file);
      commit('UPLOAD_USER_IMAGE', { header });
      commit('user/UPDATE_USER', { header }, { root: true });
    }
  },
  async uploadTeamImage({ commit }, { file, type }: { file: File; type: 'avatar' | 'header' }) {
    if (type === 'avatar') {
      const avatar = await teamService.uploadAvatar(file);
      commit('UPLOAD_TEAM_IMAGE', { avatar });
    } else {
      const header = await teamService.uploadHeader(file);
      commit('UPLOAD_TEAM_IMAGE', { header });
    }
  },
};

export default actions;
