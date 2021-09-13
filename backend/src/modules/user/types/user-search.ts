export interface UserSearchBody {
  id: number;
  username: string;
  name: string;
  email: string;
}
export interface UserSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: UserSearchBody;
    }>;
  };
}
