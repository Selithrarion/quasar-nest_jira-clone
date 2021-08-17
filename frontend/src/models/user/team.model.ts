import { BaseModel } from 'src/models/common/base.model';
import { UserModel } from 'src/models/user/user.model';

export interface TeamModel extends BaseModel {
  name: string;
  color: string;
  users: UserModel[];
}

export interface TeamDTO {
  name: string
}
