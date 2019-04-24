import { Query } from "../@types";
import _ from 'lodash'
import { parseSort } from "./";

/** 
 * parseQuery は クエリーパラメータを分解する
 * @param {any} query クエリーパラメータ
 * @return {Query}
*/
export const parseQuery = (query: any): Query => {
  const p: Query = {
    limit: 30,
    page: 1,
    sort: [],
  };

  const queryStr: any = query;

  if (queryStr.hasOwnProperty('limit')) {
    const limitStr: number = parseInt(queryStr['limit']);
    if (typeof limitStr !== 'number') {
      throw new Error();
    }
    p.limit = limitStr;
  }

  if (queryStr.hasOwnProperty('page')) {
    const pageStr: number = _.parseInt(queryStr['page']);
    if (typeof pageStr !== 'number') {
      throw new Error();
    }
    p.page = pageStr;
  }

  p.sort = parseSort(queryStr);
  return p;
};
