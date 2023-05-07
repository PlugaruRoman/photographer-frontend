export interface IResults<T> {
  count: number;
  current_page: number;
  per_page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  total: number;
}
