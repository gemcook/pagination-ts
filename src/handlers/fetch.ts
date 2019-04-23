import {Fetcher, Setting, Pager} from '../@types';
import {newPager, getPages, getPageCount} from './'

/** 
 * fetch returns paging response using arbitary record fetcher
 * @param {Fetcher<T, U>} fetcher fetcher関数を渡す
 * @param {Setting<T>} setting limit, page, cond, ordersを渡す
*/
export const fetch = <T, U>(fetcher: Fetcher<T, U>, setting: Setting<T>)
: {totalCount: number, pageCount: number, res: any} => {
  const pager: Pager<T, U> = newPager(fetcher, setting);

  if (pager === null) {
    return {totalCount: 0, pageCount: 0, res: null};
  }

  const res: any = getPages(pager);

  return {
    totalCount: pager.totalCount,
    pageCount: getPageCount(pager),
    res,
  };
};
