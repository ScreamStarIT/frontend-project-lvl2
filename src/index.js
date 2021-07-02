import _ from 'lodash';
import parse from './parsers.js';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.sortBy(keys1.concat(keys2));
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const keys = _.uniq(getSortedKeys(data1, data2));
  const difference = keys.reduce((string, key) => {
    if (_.has(data1, `${key}`) && _.has(data2, `${key}`)) {
      return data1[key] === data2[key] ? (
        `${string}    ${key}: ${data1[key]}\n`
      ) : (
        `${string}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`
      );
    }
    if (_.has(data1, `${key}`)) {
      return `${string}  - ${key}: ${data1[key]}\n`;
    }
    return `${string}  + ${key}: ${data2[key]}\n`;
  }, '');
  return `{\n${difference}}`;
};

export default genDiff;
