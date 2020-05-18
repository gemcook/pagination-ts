import {Query} from './query';
import {FetchResponse} from './fetchResponse';
import {Fetcher} from './fetcher';
import {Setting} from './setting';

export function parseQuery(query: any): Query;
export function fetch<T, U>(
  fetcher: Fetcher,
  setting: Setting
): Promise<FetchResponse>;
