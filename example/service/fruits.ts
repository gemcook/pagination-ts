import {fruitsRepository} from '../repository';

/**
 * ページネーション用サービス_フルーツを取得します
 * @param {query} クエリーパラメータ
*/
const getPaging = (query: object) => {
  return fruitsRepository.getPaging(query);
}

export const fruitsService = {
  getPaging,
}