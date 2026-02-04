import { load } from 'js-yaml';

export default function parse(content) {
  return load(content);
}
