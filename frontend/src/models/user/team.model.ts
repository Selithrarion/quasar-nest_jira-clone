import { BaseModel } from 'src/models/common/base.model';
import { UserModel } from 'src/models/user/user.model';
import { PublicFileModel } from '../common/public.file.model';

export interface TeamModel extends BaseModel {
  name: string;

  color: string;
  avatar: PublicFileModel | null;
  header: PublicFileModel | null;

  users: UserModel[];
}

export interface TeamDTO {
  name: string;
  users: UserModel[]
}
