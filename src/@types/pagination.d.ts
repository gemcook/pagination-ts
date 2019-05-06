import {Query} from './query';
import {Fetcher} from './fetcher';
import {Setting} from './setting';

export type Pagination = {
  parseQuery(query: any): Query;
  fetch(fetcher: Fetcher, setting: Setting): any;
};
