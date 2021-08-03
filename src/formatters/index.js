import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJSON from './json.js';

const formatters = { stylish: makeStylish, plain: makePlain, json: makeJSON };

export default (format) => formatters[format];
