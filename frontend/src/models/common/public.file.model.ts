import { BaseModel } from 'src/models/common/base.model';

export interface PublicFileModel extends BaseModel {
  url: string;
  key: string;
}
