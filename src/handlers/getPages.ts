import {Pager} from '../@types';
import {formatResponse} from './';

/**
 * getPages gets formated paging response
 * 
*/
import {
  getPageCount,
  getActiveAndSidesLimit,
  startPageIndex,
  lastPageIndex,
} from './'

export const getPages = <T, U>(pager: Pager<T, U>): any => {
  const count = pager.fetcher.count(pager.condition);
  pager.totalCount = count;

  const pageCount = getPageCount(pager);
  if (pageCount === 0) {
    return formatResponse([], [], [], pager);
  }

  if (pager.page > pageCount) {
    throw new Error();
  }

  // activeとsidesに相当する範囲をまとめて取得する
  const {limit, offset} = getActiveAndSidesLimit(pager);
  const activeAndSides = pager.fetcher.fetchPage(pager.condition, limit, offset, pager.orders);

  // 最初のページが範囲外の場合は取得する
  const first = startPageIndex(pager) > 0
    ? pager.fetcher.fetchPage(pager.condition, pager.limit, 0, pager.orders)
    : [];
  
  // 最後のページが範囲外の場合は取得する
  const last = startPageIndex(pager) + (pager.sidePagingCount * 2) < lastPageIndex(pager)
    ? pager.fetcher.fetchPage(
        pager.condition,
        pager.limit,
        lastPageIndex(pager) * pager.limit,
        pager.orders
      )
    : [];
  
  return formatResponse(first, activeAndSides, last, pager);
};
