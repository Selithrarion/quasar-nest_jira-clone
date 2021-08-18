import { MutationTree } from 'vuex';
import { PeopleStateInterface } from './state';
import { UserDTO, UserModel } from 'src/models/user/user.model';
import { TeamDTO, TeamModel } from 'src/models/user/team.model';

const mutation: MutationTree<PeopleStateInterface> = {
  SET_USER_DETAIL(state: PeopleStateInterface, user: UserModel) {
    state.userDetail = user;
  },
  SET_TEAM_DETAIL(state: PeopleStateInterface, team: TeamModel) {
    state.teamDetail = team;
  },

  UPDATE_USER_DETAIL(state: PeopleStateInterface, team: UserDTO) {
    state.userDetail = { ...state.userDetail, ...team } as UserModel;
  },
  UPDATE_TEAM_DETAIL(state: PeopleStateInterface, team: TeamDTO) {
    state.teamDetail = { ...state.teamDetail, ...team } as TeamModel;
  },
};

export default mutation;
