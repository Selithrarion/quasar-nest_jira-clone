export interface ApiResponseModel<T> {
  config: unknown;
  data: T;
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
}
