import {Pager} from '../@types';
import {formatResponse} from './formatResponse';
import {getActiveAndSidesLimit} from './getActiveAndSidesLimit';
import {getPageCount} from './getPageCount';
import {startPageIndex} from './startPageIndex';
import {lastPageIndex} from './lastPageIndex';

export const getPages = <T, U>(pager: Pager<T, U>): any => {
  const count: number = pager.fetcher.count(pager.condition);
  pager.totalCount = count;

  const pageCount: number = getPageCount(pager);
  if (pageCount === 0) {
    return formatResponse([], [], [], pager);
  }

  if (pager.page > pageCount) {
    throw new Error();
  }

  // activeとsidesに相当する範囲をまとめて取得する
  const {limit, offset} = getActiveAndSidesLimit(pager);
  const activeAndSides: Array<U> = pager.fetcher.fetchPage(
    pager.condition,
    limit,
    offset,
    pager.orders
  );

  // 最初のページが範囲外の場合は取得する
  const first: Array<U> =
    startPageIndex(pager) > 0
      ? pager.fetcher.fetchPage(pager.condition, pager.limit, 0, pager.orders)
      : [];

  // 最後のページが範囲外の場合は取得する
  const last: Array<U> =
    startPageIndex(pager) + pager.sidePagingCount * 2 < lastPageIndex(pager)
      ? pager.fetcher.fetchPage(
          pager.condition,
          pager.limit,
          lastPageIndex(pager) * pager.limit,
          pager.orders
        )
      : [];

  return formatResponse(first, activeAndSides, last, pager);
};
