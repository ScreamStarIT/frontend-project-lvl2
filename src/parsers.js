import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const content = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
  const format = path.extname(filepath).slice(1);
  const parsers = {
    json: (content1) => JSON.parse(content1),
    yaml: (content2) => yaml.load(content2),
    yml: (content3) => yaml.load(content3),
  };
  return parsers[format](content);
};

export default parse;
