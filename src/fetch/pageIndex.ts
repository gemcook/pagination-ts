import {Pager} from '../@types';

export const startPageIndex = <T, U>(pager: Pager<T, U>) => {
  let startPageIndex: number = pager.page - 1 - pager.sidePagingCount;

  // 最終ページを含む場合は取得開始位置を調整する
  const endPageIndex: number = startPageIndex + pager.sidePagingCount * 2;
  if (endPageIndex > lastPageIndex(pager)) {
    startPageIndex = startPageIndex - (endPageIndex - lastPageIndex(pager));
  }

  // 最初のページインデックスが0より小さい時
  if (startPageIndex < 0) {
    startPageIndex = 0;
  }

  return startPageIndex;
};

export const lastPageIndex = <T, U>(pager: Pager<T, U>): number => {
  if (pager.totalCount < 1 || pager.limit === 0) {
    return 0;
  }

  // 最後のページのインデックスを計算する
  const lastPageIndex: number = Math.ceil((pager.totalCount - 1) / pager.limit);
  return lastPageIndex;
};
