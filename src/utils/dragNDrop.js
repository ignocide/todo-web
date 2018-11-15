const PARAM_INFO_KEY = '__params_info__';
const TYPE_KEY = '__type__';

// data는 오브젝트 타입, 그리고 속성의 값은 원시타입
export const setData = function (event, data) {
  const keys = Object.keys(data);
  const keyString = keys.join('|||');

  for (const key of keys) {
    event.dataTransfer.setData(key, data[key]);
  }
  event.dataTransfer.setData(PARAM_INFO_KEY, keyString);
};

export const getData = function (event) {
  const keyString = event.dataTransfer.getData(PARAM_INFO_KEY);
  const keys = keyString.split('|||');
  const result = {};
  for (const key of keys) {
    result[key] = event.dataTransfer.getData(key);
  }
  return result;
};


export const setType = function (event, type) {
  event.dataTransfer.setData(TYPE_KEY, type);
};

export const getType = function (event) {
  const type = event.dataTransfer.getData(TYPE_KEY);
  return type;
};
