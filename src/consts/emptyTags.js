import { toMap } from '../utils';

const emptyTags = Object.create(null);

toMap([
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
], emptyTags);

export default emptyTags;
