export interface IResult<T> {
  total: number;
  page: number;
  limit: number;
  country: string[];
  profiles: T[];
}
