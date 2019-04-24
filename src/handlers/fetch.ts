import {Fetcher, Setting, Pager} from '../@types';
import {newPager} from './newPager';
import {getPages} from './getPages';
import {getPageCount} from './getPageCount';

/**
 * fetch returns paging response using arbitary record fetcher
 * @param {Fetcher<T, U>} fetcher fetcher関数を渡す
 * @param {Setting<T>} setting limit, page, cond, ordersを渡す
 */
export const fetch = <T, U>(fetcher: Fetcher<T, U>, setting: Setting<T>) => {
  const pager: Pager<T, U> = newPager(fetcher, setting);

  if (pager === null) {
    return {totalCount: 0, totalPages: 0, res: null};
  }

  const res: any = getPages(pager);

  const response: any = {
    active: res['active'],
    first: res['first'],
    last: res['last'],
    before_distant: res['before_distant'],
    before_near: res['before_near'],
    after_near: res['after_near'],
    after_distant: res['after_distant'],
  };

  return {
    totalCount: pager.totalCount,
    totalPages: getPageCount(pager),
    pages: response,
  };
};
