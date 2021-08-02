import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = { stylish: makeStylish, plain: makePlain };

export default (format) => formatters[format];
