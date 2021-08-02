import _ from 'lodash';

const makeOutputValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const statusActions = {
  added: (keyPath, object) => [`Property '${keyPath.join('.')}' was added with value: ${makeOutputValue(object.value)}`],
  removed: (keyPath) => [`Property '${keyPath.join('.')}' was removed`],
  modified: (keyPath, object) => [`Property '${keyPath.join('.')}' was updated. From ${makeOutputValue(object.oldValue)} to ${makeOutputValue(object.newValue)}`],
  nested: (keyPath, object, func) => func(object.children, keyPath),
  unchanged: () => [],
};

const makePlain = (difference, path = []) => {
  const strings = difference.flatMap((item) => {
    const { key, status } = item;
    const keyPath = [...path, key];
    return statusActions[status](keyPath, item, makePlain);
  });
  return strings.join('\n');
};

export default makePlain;
