export interface GadgetModel {
  readonly id: number;
  label: string;
  color: string;
}

export type GadgetsTuple = [GadgetModel | null, GadgetModel | null, GadgetModel | null];
