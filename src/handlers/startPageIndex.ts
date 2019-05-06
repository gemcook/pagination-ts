import {Pager} from '../@types';
import {lastPageIndex} from './lastPageIndex';

export const startPageIndex = <T, U>(pager: Pager<T, U>): number => {
  let startPageIndex: number = pager.page - 1 - pager.sidePagingCount;

  // 最終ページを含む場合は取得開始位置を調整する
  const endPageIndex: number = startPageIndex + pager.sidePagingCount * 2;
  if (endPageIndex > lastPageIndex(pager)) {
    startPageIndex = startPageIndex - (endPageIndex - lastPageIndex(pager));
  }

  if (startPageIndex < 0) {
    startPageIndex = 0;
  }

  return startPageIndex;
};
