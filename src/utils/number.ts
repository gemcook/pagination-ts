/**
 * 数値を文字列に変換する
 * @param {number} num
 * @return {string|null} 成功の場合、文字列を返す. 異常の場合、nullを返す
*/
const toString = (num: number): string|null => {
  if (typeof num === 'number') {
    return num.toString();
  } else {
    return null;
  }
};

export const number = {
  toString,
};
