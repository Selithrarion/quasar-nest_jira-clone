import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PeopleStateInterface } from 'src/store/people/state';
import { UserDTO } from 'src/models/user/user.model';
import { TeamDTO } from 'src/models/user/team.model';
import userRepository from 'src/repositories/userRepository';
import teamRepository from 'src/repositories/teamRepository';

const actions: ActionTree<PeopleStateInterface, StateInterface> = {
  async getUserByID({ commit }, id: number) {
    const user = await userRepository.getByID(id);
    commit('SET_USER_DETAIL', user);
  },
  async getTeamByID({ commit }, id: number) {
    const team = await teamRepository.getByID(id);
    commit('SET_TEAM_DETAIL', team);
  },

  async updateUser({ commit }, { id, payload }: { id: number; payload: UserDTO }) {
    commit('UPDATE_USER_DETAIL', payload);
    await userRepository.update(id, payload);
  },
  async updateTeam({ commit }, { id, payload }: { id: number; payload: TeamDTO }) {
    commit('UPDATE_TEAM_DETAIL', payload);
    await teamRepository.update(id, payload);
  },

  async uploadUserImage({ commit }, { file, type }: { file: File; type: 'avatar' | 'header' }) {
    if (type === 'avatar') {
      const avatar = await userRepository.uploadAvatar(file);
      commit('UPDATE_USER_DETAIL', { avatar });
      commit('user/UPDATE_USER', { avatar }, { root: true });
    } else {
      const header = await userRepository.uploadHeader(file);
      commit('UPDATE_USER_DETAIL', { header });
      commit('user/UPDATE_USER', { header }, { root: true });
    }
  },
  async uploadTeamImage({ commit }, { file, type, id }: { file: File; type: 'avatar' | 'header'; id: number }) {
    if (type === 'avatar') {
      const avatar = await teamRepository.uploadAvatar(file, id);
      commit('UPDATE_TEAM_DETAIL', { avatar });
    } else {
      const header = await teamRepository.uploadHeader(file, id);
      commit('UPDATE_TEAM_DETAIL', { header });
    }
  },

  async deleteUserHeader({ state, commit }) {
    if (!state.userDetail?.header) return;
    await userRepository.deleteHeader();
    commit('UPDATE_USER_DETAIL', { header: null });
  },
  async deleteTeamHeader({ state, commit }) {
    if (!state.teamDetail?.header) return;
    await teamRepository.deleteHeader();
    commit('UPDATE_TEAM_DETAIL', { header: null });
  },
};

export default actions;
