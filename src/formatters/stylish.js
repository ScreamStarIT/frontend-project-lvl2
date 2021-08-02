import _ from 'lodash';

const indent = (amount) => '    '.repeat(amount);

const stringifyObject = (data, count, func) => {
  if (!_.isObject(data)) {
    return data;
  }
  const strings = Object.entries(data).map(([key, value]) => func(count + 1, key, value, '    '));
  return ['{', ...strings, `${indent(count + 1)}}`].join('\n');
};

const stringifyValue = (depth, key, value, sign) => `${indent(depth)}${sign}${key}: ${stringifyObject(value, depth, stringifyValue)}`;

const statusActions = {
  nested: (count, object, func) => stringifyValue(count, object.key, func(object.children, count + 1), '    '),
  modified: (count, object) => [
    stringifyValue(count, object.key, object.oldValue, '  - '),
    stringifyValue(count, object.key, object.newValue, '  + '),
  ],
  removed: (count, object) => stringifyValue(count, object.key, object.value, '  - '),
  added: (count, object) => stringifyValue(count, object.key, object.value, '  + '),
  unchanged: (count, object) => stringifyValue(count, object.key, object.value, '    '),
};

const makeStylish = (diffs, depth = 0) => {
  const strings = diffs.flatMap((item) => statusActions[item.status](depth, item, makeStylish));
  return ['{', ...strings, `${indent(depth)}}`].join('\n');
};

export default makeStylish;
