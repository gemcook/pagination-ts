import {Fetcher, Setting, Pager} from '../@types';

export const newPager = <T, U>(
  fetcher: Fetcher<T, U>,
  setting: Setting<T>
): Pager<T, U> | null => {
  const pager: Pager<T, U> = {
    limit: 10,
    page: 1,
    sidePagingCount: 2,
    totalCount: 0,
    orders: setting.orders,
    condition: setting.cond,
    fetcher: fetcher,
  };

  if (setting.limit !== 0) {
    pager.limit = setting.limit;
  }

  if (setting.page !== 0) {
    if (setting.page < 1) {
      return null;
    }
    pager.page = setting.page;
  }

  return pager;
};
