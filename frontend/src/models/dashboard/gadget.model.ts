import { BaseModel } from 'src/models/common/base.model';

export interface GadgetModel extends BaseModel{
  label: string;
  color: string;
}

export type GadgetsTuple = [GadgetModel | null, GadgetModel | null, GadgetModel | null];
