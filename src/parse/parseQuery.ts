import {Query} from '../@types';
import _ from 'lodash';
import {parseSort} from './parseSort';

export const parseQuery = (query: any): Query => {
  const p: Query = {
    limit: 30,
    page: 1,
    sort: [],
  };

  if (query.hasOwnProperty('limit')) {
    const limitStr: number = _.parseInt(query['limit']);
    if (typeof limitStr !== 'number') {
      throw new Error();
    }
    p.limit = limitStr;
  }

  if (query.hasOwnProperty('page')) {
    const pageStr: number = _.parseInt(query['page']);
    if (typeof pageStr !== 'number') {
      throw new Error();
    }
    p.page = pageStr;
  }

  p.sort = parseSort(query);
  return p;
};
