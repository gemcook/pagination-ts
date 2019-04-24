import {Order} from './order';

export class Query {
  constructor(limit: number, page: number, enabled: boolean) {
    this.limit = limit;
    this.page = page;
    this.enabled = enabled;
  }

  limit: number;
  page: number;
  public sort: Order[] = [];
  enabled: boolean;
}