/**
 * @param {string} str 文字列
 * @return {number|null} 成功の場合、数値を返す。異常の場合、nullを返す
 */
const toNumber = (str: string): number | null => {
  const result = parseInt(str);

  if (isNaN(result)) {
    return null;
  } else {
    return result;
  }
};

export const string = {
  toNumber,
};
