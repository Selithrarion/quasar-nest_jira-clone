import { ColumnInterface } from 'src/models/project/column.interface';

export interface BoardInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  columns: ColumnInterface[];
}
