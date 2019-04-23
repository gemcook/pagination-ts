export type Fetcher<T, U> = {
  count(cond: T): number;
  fetchPage(cond: T, limit: number, offset: number, order: Array<{direction: string, columnName: string}>): Array<U>;
};
