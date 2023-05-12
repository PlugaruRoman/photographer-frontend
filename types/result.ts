export interface IResult<T> {
  total: number;
  page: number;
  limit: number;
  city: string[];
  profiles: T[];
}
