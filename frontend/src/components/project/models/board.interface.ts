import ColumnInterface from "components/project/models/column.interface";

export default interface BoardInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  columns: ColumnInterface[]
}
