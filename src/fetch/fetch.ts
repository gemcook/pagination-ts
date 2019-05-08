import {FetchResponse, Pager, Fetcher, Setting} from '../@types';
import {newPager} from './newPager';
import {getPages} from './getPages';
import {getPageCount} from './getPageCount';

export const fetch = async <T, U>(
  fetcher: Fetcher<T, U>,
  setting: Setting<T>
): Promise<FetchResponse> => {
  // pagerの設定をする
  const pager: Pager<T, U> | null = newPager(fetcher, setting);

  if (pager === null) {
    return {
      totalCount: 0,
      totalPage: 0,
      pages: null,
    };
  }

  // ページネーションの中身を取得する
  const data: any = await getPages(pager);
  const pages: any = {
    active: data['active'],
    first: data['first'],
    last: data['last'],
    before_distant: data['before_distant'],
    before_near: data['before_near'],
    after_near: data['after_near'],
    after_distant: data['after_distant'],
  };

  return {
    totalCount: pager.totalCount,
    totalPage: getPageCount(pager),
    pages,
  };
};
