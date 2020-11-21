import { isEmpty, isString } from 'lodash';

export default (data, filterString, trigger) => {
  if (isEmpty(filterString) || filterString.length < trigger) return data;
  return data.filter((d) =>
    Object.entries(d).some(([key, val]) => {
      const ignoreProps = ['url'];
      if (ignoreProps.includes(key)) return false;
      if (!isString(val)) return false;
      const reg = new RegExp(filterString.toLowerCase(), 'g');
      return val.toLowerCase().match(reg);
    }),
  );
};
