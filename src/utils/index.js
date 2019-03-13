import { isArray } from './type';
import { isReactComponent } from './isReactComponent';
import { kebabToCamel, camelToKebab, toLowerCase, toUpperCase } from './transform';
import { toMap } from './toMap';
import { escape } from './escape';
import { validateValueForDomAttr, validateValueForSelfDefineAttr } from './validate';

export {
    kebabToCamel,
    camelToKebab,
    toLowerCase,
    toUpperCase,

    isReactComponent,
    isArray,
    toMap,
    escape,

    validateValueForDomAttr,
    validateValueForSelfDefineAttr
}