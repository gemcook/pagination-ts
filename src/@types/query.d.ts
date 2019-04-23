export type Query = {
  limit: number;
  page: number;
  sort: Array<{direction: string, columnName: string}>;
};
