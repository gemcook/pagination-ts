/**
 * @param {string} cond 文字列
 * @return {boolean}
*/
const nextChar = (cond: string): boolean => {
  switch(cond) {
    case '+':
    case '-':
    case ' ':
      return true;
    default:
      return false;
  }
};

/**
 * @param {string} cond + または, -を受け取る
 * @return {boolean}
*/
const isPlusMinux = (cond: string): boolean => {
  if (cond === '+' || cond === ' ') {
    return true;
  } else if (cond === '-') {
    return false;
  }
}

export const cond = {
  nextChar,
  isPlusMinux,
};
