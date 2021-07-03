import { ColumnInterface } from 'components/project/models/column.interface';

export interface BoardInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  columns: ColumnInterface[];
}
