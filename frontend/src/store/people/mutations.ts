import { MutationTree } from 'vuex';
import { PeopleStateInterface } from './state';
import { UserModel } from 'src/models/user/user.model';
import { TeamModel } from 'src/models/user/team.model';

const mutation: MutationTree<PeopleStateInterface> = {
  SET_USER_DETAIL(state: PeopleStateInterface, user: UserModel) {
    state.userDetail = user;
  },
  SET_TEAM_DETAIL(state: PeopleStateInterface, team: TeamModel) {
    state.teamDetail = team;
  },
};

export default mutation;
