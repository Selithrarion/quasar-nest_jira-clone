export interface GadgetInterface {
  readonly id: number;
  label: string;
  color: string;
}

export type GadgetsTuple = [GadgetInterface | null, GadgetInterface | null, GadgetInterface | null];
