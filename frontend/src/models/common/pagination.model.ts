export interface PaginationData<T> {
  items: T;
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PaginationTableProps {
  filter: unknown;
  getCellValue: (col: unknown, row: unknown) => unknown;
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}

export interface PaginationApiPayload {
  page: number;
  limit: number;
  sortBy: string;
  descending: boolean;
}
