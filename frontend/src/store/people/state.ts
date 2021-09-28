import { UserModel } from 'src/models/user/user.model';
import { TeamModel } from 'src/models/user/team.model';

export interface PeopleStateInterface {
  userDetail: UserModel | null;
  teamDetail: TeamModel | null;
}

function state(): PeopleStateInterface {
  return {
    userDetail: null,
    teamDetail: null,
  };
}

export default state;
