import {
    toMap,
    camelToKebab,
    kebabToCamel,
    toLowerCase
} from '../utils';

const domAttrs = {
    'className': 'class',
    'htmlFor': 'for',
    'download': 'download'
};

toMap([
    'checked',
    'multiple',
    'muted',
    'autoReverse',
    'selected',
    'externalResourcesRequired',
    'focusable',
    'preserveAlpha',
    'cols',
    'rows',
    'size',
    'span',
    'hidden',
    'loop',
    'capture',
    'open',
    'async',
    'reversed',
    'scoped',
    'seamless'
], domAttrs, name => name);

// 驼峰 -> 短横线
toMap([
    'acceptCharset',
    'httpEquiv'
], domAttrs, camelToKebab);

// 短横线 -> 驼峰
toMap([
    'contentEditable',
    'draggable',
    'spellCheck',
    'value'
], domAttrs, kebabToCamel);

// 大写 -> 小写
toMap([
    'itemScope',
    'formNoValidate',
    'noModule',
    'noValidate',
    'rowSpan',
    'start',
    'contentEditable',
    'draggable',
    'spellCheck',
    'value',
    'allowFullScreen',
    'autoFocus',
    'autoPlay',
    'controls',
    'default',
    'defer',
    'disabled',
    'playsInline',
    'readOnly',
    'required',
    'tabIndex',
    'crossOrigin'
], domAttrs, toLowerCase);

export default domAttrs;