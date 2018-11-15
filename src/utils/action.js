export const createAction = function (keyword) {
  const REQUEST_KEYWORD = `${keyword}/REQUEST`;
  const SUCCESS_KEYWORD = `${keyword}/SUCCESS`;
  const FAILURE_KEYWORD = `${keyword}/FAILURE`;
  return {
    REQUEST: REQUEST_KEYWORD,
    SUCCESS: SUCCESS_KEYWORD,
    FAILURE: FAILURE_KEYWORD,
  };
};
