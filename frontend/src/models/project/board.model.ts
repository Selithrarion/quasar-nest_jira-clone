import { ColumnModel } from 'src/models/project/column.model';

export interface BoardModel {
  readonly id: number;
  name: string;
  favorite: boolean;
  columns: ColumnModel[];
}
