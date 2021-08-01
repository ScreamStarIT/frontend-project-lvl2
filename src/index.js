import _ from 'lodash';
import getData from './parsers.js';
import getFormatter from './formatters/index.js';

const compare = (dataBefore, dataAfter) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const sortedKeys = _.sortBy(_.union(keysBefore, keysAfter));
  return sortedKeys.map((key) => {
    if (keysBefore.includes(key) && keysAfter.includes(key)) {
      if (_.isEqual(dataBefore[key], dataAfter[key])) {
        return { key, status: 'unchanged', value: dataBefore[key] };
      }
      if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
        const children = compare(dataBefore[key], dataAfter[key]);
        return { key, status: 'nested', children };
      }
    }
    if (!keysBefore.includes(key)) {
      return { key, status: 'added', value: dataAfter[key] };
    }
    if (!keysAfter.includes(key)) {
      return { key, status: 'removed', value: dataBefore[key] };
    }
    return {
      key, status: 'modified', oldValue: dataBefore[key], newValue: dataAfter[key],
    };
  });
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  return getFormatter(outputFormat)(compare(data1, data2));
};

export default genDiff;
