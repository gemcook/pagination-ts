import {Pager} from '../@types';
import {getPageCount} from './getPageCount';
import {getActiveAndSidesLimit} from './getActiveAndSidesLimit';
import {startPageIndex, lastPageIndex} from './pageIndex';
import {formatResponse} from './formatResponse';

export const getPages = async <T, U>(pager: Pager<T, U>): Promise<any> => {
  // 条件から全体数を取得する
  const count: number = await pager.fetcher.count(pager.condition);
  pager.totalCount = count;

  const pageCount: number = getPageCount(pager);
  if (pageCount === 0) {
    return formatResponse([], [], [], pager);
  }

  if (pager.page > pageCount) {
    throw new Error(`page is out of range. page range is 1-${pageCount}`);
  }

  // activeとsidesに相当する範囲をまとめて取得する
  const {limit, offset} = getActiveAndSidesLimit(pager);

  const activeAndSides: Array<U> = await pager.fetcher.fetchPage(
    pager.condition,
    limit,
    offset,
    pager.orders
  );

  // 最初のページが範囲外の場合は取得する
  let first: Array<U> = [];
  if (startPageIndex(pager) > 0) {
    first = await pager.fetcher.fetchPage(
      pager.condition,
      pager.limit,
      0,
      pager.orders
    );
  }

  // 最後のページが範囲外の場合は取得する
  let last: Array<U> = [];
  if (
    startPageIndex(pager) + pager.sidePagingCount * 2 <
    lastPageIndex(pager)
  ) {
    last = await pager.fetcher.fetchPage(
      pager.condition,
      pager.limit,
      lastPageIndex(pager) * pager.limit,
      pager.orders
    );
  }

  return formatResponse(first, activeAndSides, last, pager);
};
